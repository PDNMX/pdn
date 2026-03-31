import { GoogleGenAI } from "@google/genai";
import { ComparisonMetric } from "../types";

export const generateAnalysis = async (data: ComparisonMetric[], contextType: 'Institucional' | 'General'): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Prepare the data context for the model
    const dataContext = JSON.stringify(data);

    const prompt = `
      Actúa como un analista de datos experto en auditoría pública. 
      Analiza los siguientes datos JSON que corresponden al panorama ${contextType} comparado con el promedio nacional.
      
      Datos: ${dataContext}
      
      Genera un párrafo conciso (máximo 40 palabras) en español resumiendo los hallazgos más críticos. 
      Enfócate en los riesgos principales detectados.
      Usa un tono profesional, objetivo y directo.
      No uses markdown, solo texto plano.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No se pudo generar el análisis.";
  } catch (error) {
    console.error("Error generating analysis:", error);
    return "Error al conectar con el servicio de análisis inteligente. Por favor intente más tarde.";
  }
};