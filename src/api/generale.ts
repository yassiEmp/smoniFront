export interface Commune {
  nom: string;
  code: string;
  codeDepartement: string;
  siren: string;
  codeEpci: string;
  codeRegion: string;
  codesPostaux: string[];
  population: number;
}

export const fetchCommunes = async (departementCodes: string[]): Promise<Commune[]> => {
  try {
    const promises = departementCodes.map(async (deptCode) => {
      const response = await fetch(`https://geo.api.gouv.fr/departements/${deptCode}/communes`);
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des communes pour le département ${deptCode}`);
      }
      const data = await response.json();
      return data;
    });

    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.error("Erreur lors de la récupération des communes:", error);
    return [];
  }
};

export const IDF_DEPARTEMENTS = ["75", "92", "93", "94", "95", "78", "91", "77"];
