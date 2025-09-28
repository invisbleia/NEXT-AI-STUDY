
import { GoogleGenAI, Type } from "@google/genai";
import type { TenseDetails, GenerationOptions } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const createDynamicSchema = (options: GenerationOptions) => {
    const voiceDetailsSchema = {
        type: Type.OBJECT,
        properties: {
            formula: {
                type: Type.OBJECT,
                properties: {
                    affirmative: { type: Type.STRING, description: "e.g., Subject + verb + Object. If there's a helping verb, include it using the format H.V (actual verb), e.g., 'Subject + H.V (is/am/are) + V-ing + Object'." },
                    negative: { type: Type.STRING, description: "e.g., Subject + H.V (do/does) + not + verb + Object" },
                    interrogative: { type: Type.STRING, description: "e.g., H.V (do/does) + Subject + verb + Object + ?" },
                },
                required: ["affirmative", "negative", "interrogative"],
            },
            examples: {
                type: Type.ARRAY,
                description: "Provide exactly 3 example sentences: one affirmative (A), one negative (N), and one interrogative (I).",
                items: { type: Type.STRING },
            },
        },
        required: ["formula", "examples"],
    };

    const detailedExampleSchema = {
        type: Type.OBJECT,
        properties: {
            activeVoice: {
                type: Type.OBJECT,
                properties: {
                    urdu: { type: Type.STRING, description: "A full sentence in Urdu." },
                    english: {
                        type: Type.ARRAY,
                        description: "The English translation in 3 forms: affirmative (A), negative (N), and interrogative (I).",
                        items: { type: Type.STRING },
                    },
                },
                 required: ["urdu", "english"],
            },
            ...(options.includePassiveVoice && {
                passiveVoice: {
                    type: Type.OBJECT,
                    properties: {
                        english: {
                            type: Type.ARRAY,
                            description: "The passive voice of the English translation in 3 forms: affirmative (A), negative (N), and interrogative (I).",
                            items: { type: Type.STRING },
                        },
                    },
                    required: ["english"],
                },
            })
        },
        required: ["activeVoice", ...(options.includePassiveVoice ? ["passiveVoice"] : [])],
    };

    const schema: any = {
      type: Type.OBJECT,
      properties: {
        tenseName: { type: Type.STRING, description: "The full name of the tense, e.g., 'Present Indefinite Tense'." },
      },
      required: ["tenseName"],
    };

    if (options.includeDefinition) {
        const descriptionLength = {
            short: "a short, clear definition (1-2 sentences)",
            medium: "a medium-length definition (3-4 sentences)",
            long: "a long, detailed definition (a full paragraph)",
        };
        schema.properties.definition = { type: Type.STRING, description: `Provide ${descriptionLength[options.definitionLength]} explaining the primary use of the tense.` };
        schema.required.push("definition");
    }

    if (options.includeUrduIdentification) {
        schema.properties.urduIdentification = { type: Type.STRING, description: "Provide ONLY the 3-4 primary Urdu identification endings. For example, for Present Perfect Tense, provide only 'چکا ہے، چکی ہے، چکے ہیں، چکا ہوں' and nothing else." };
        schema.required.push("urduIdentification");
    }
    
    if (options.includeActiveVoice) {
        schema.properties.activeVoice = voiceDetailsSchema;
        schema.required.push("activeVoice");
    }

    if (options.includePassiveVoice) {
        schema.properties.passiveVoice = voiceDetailsSchema;
        schema.required.push("passiveVoice");
    }

    if (options.includeDetailedExamples) {
        schema.properties.detailedExamples = {
            type: Type.ARRAY,
            description: `Provide exactly ${options.numberOfExamples} full Urdu-to-English conversion examples that are of ${options.detailedExampleDifficulty} difficulty.`,
            items: detailedExampleSchema,
        };
        schema.required.push("detailedExamples");
    }

    return schema;
};

const createSystemInstruction = (options: GenerationOptions): string => {
    let instruction = `You are an expert English grammar teacher specializing in teaching English to Urdu speakers. Your task is to provide a detailed breakdown of a given English tense in a structured JSON format. Ensure all explanations are clear, concise, and accurate. Follow the provided JSON schema precisely. For formulas, use placeholders like 'Subject', 'Object', 'V1' (First Form of Verb), 'V2' (Second Form), 'V3' (Third Form), 'V-ing' (Present Participle). For helping verbs, you must use the format 'H.V (actual helping verb)'. For example, for Present Indefinite, the negative formula would contain 'H.V (do/does)'.`;
    
    instruction += options.includeDefinition ? ` You MUST provide a definition of ${options.definitionLength} length.` : ` You MUST NOT provide a definition.`;
    instruction += options.includeUrduIdentification ? ` You MUST provide the primary Urdu identification endings (3-4 only). For 'Present Perfect Tense', only return 'چکا ہے، چکی ہے، چکے ہیں، چکا ہوں'. Do NOT include secondary identifications like 'لیا ہے' or 'دیا ہے'.` : ` You MUST NOT provide Urdu identification.`;
    instruction += options.includeActiveVoice ? ` You MUST provide details for the active voice.` : ` You MUST NOT provide details for the active voice.`;
    instruction += options.includePassiveVoice ? ` You MUST provide details for the passive voice. In passive voice formulas, do not append '(as Agent)' to the 'Subject'.` : ` You MUST NOT provide any details for the passive voice.`;
    
    if (options.includeDetailedExamples) {
        instruction += ` You MUST provide exactly ${options.numberOfExamples} detailed Urdu-to-English conversion examples. The examples should be of ${options.detailedExampleDifficulty} difficulty for a learner.`;
        instruction += ` The examples MUST use ${options.exampleSentenceStructure} sentence structures, ${options.exampleVocabularyLevel} level vocabulary, and a ${options.exampleTone} tone.`;
    } else {
        instruction += ` You MUST NOT provide any detailed Urdu-to-English conversion examples.`;
    }

    return instruction;
};

export const generateTenseExplanation = async (tenseName: string, options: GenerationOptions): Promise<TenseDetails> => {
    const schema = createDynamicSchema(options);
    const systemInstruction = createSystemInstruction(options);
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: tenseName,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: schema,
        }
    });
    
    const jsonText = response.text.trim();
    try {
        return JSON.parse(jsonText) as TenseDetails;
    } catch (e) {
        console.error("Failed to parse JSON response:", jsonText);
        throw new Error("The AI returned an invalid response format.");
    }
};
