
import { Question } from '../test';

export const questionsData: Question[] = [
  {
    id: "1",
    title: "Expérience de la conduite",
    subQuestions: [
      {
        id: "1a",
        title: "Permis",
        options: [
          { id: "a", label: "B1 ou AM", score: 1 },
          { id: "b", label: "A1", score: 2 },
          { id: "c", label: "A2", score: 2 },
          { id: "d", label: "A", score: 2 },
        ]
      },
      {
        id: "1b",
        title: "Conduite auto",
        options: [
          { id: "a", label: "Jamais", score: 0 },
          { id: "b", label: "- de 5 h.", score: 1 },
          { id: "c", label: "+ de 5 h.", score: 2 }
        ]
      },
      {
        id: "1c",
        title: "Avec qui ?",
        options: [
          { id: "a", label: "amis", score: -1 },
          { id: "b", label: "parents", score: 1 },
          { id: "c", label: "auto-école", score: 2 }
        ]
      },
      {
        id: "1d",
        title: "Où (sauf auto-école)",
        options: [
          { id: "a", label: "ville", score: -2 },
          { id: "b", label: "route", score: -1 },
          { id: "c", label: "chemin ou parking", score: 0 },
        ]
      },
      {
        id: "1e",
        title: "Si pas auto",
        options: [
          { id: "a", label: "vélo", score: 0 },
          { id: "b", label: "cyclo/quad", score: 1 },
          { id: "c", label: "moto", score: 2 },
          { id: "d", label: "autre véh.", score: 1 }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Connaissance du véhicule",
    subQuestions: [
      {
        id: "2a",
        title: "Direction",
        options: [
          { id: "a", label: "non", score: 0 },
          { id: "b", label: "oui", score: 1 }
        ]
      },
      {
        id: "2b",
        title: "Boîte de vitesses",
        options: [
          { id: "a", label: "non", score: 0 },
          { id: "b", label: "oui", score: 1 }
        ]
      },
      {
        id: "2c",
        title: "Embrayage",
        options: [
          { id: "a", label: "non", score: 0 },
          { id: "b", label: "oui", score: 1 }
        ]
      },
      {
        id: "2d",
        title: "Freinage",
        options: [
          { id: "a", label: "non", score: 0 },
          { id: "b", label: "oui", score: 1 }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "Attitude à l’égard de l’apprentissage et de la sécurité",
    subQuestions: [
      {
        id: "3a",
        title: "À votre avis, le plus important pour bien conduire",
        options: [
          { id: "a", label: "savoir maîtriser la voiture et de connaître le code", score: -2 },
          { id: "b", label: "être capable de prévoir les difficultés et de savoir y faire face", score: 2 }
        ]
      },
      {
        id: "3b",
        title: "Motivation pour apprendre à conduire",
        options: [
          { id: "a", label: "Pour le désir d’apprendre à conduire", score: 2 },
          { id: "b", label: "Juste une nécessité", score: -2 }
        ]
      }
    ]
  },
  {
    id: "4",
    title: "Habiletés",
    subQuestions: [
      {
        id: "4a",
        title: "Installation au poste de conduite",
        options: [
          { id: "a", label: "Faible", score: -2 },
          { id: "b", label: "Satisfaisant", score: 0 },
          { id: "c", label: "Bon", score: 2 }
        ]
      },
      {
        id: "4b",
        title: "Démarrage arrêt",
        options: [
          { id: "a", label: "Faible", score: -3 },
          { id: "b", label: "Satisfaisant", score: 0 },
          { id: "c", label: "Bon", score: 2 }
        ]
      },
      {
        id: "4c",
        title: "Manipulation du volant",
        options: [
          { id: "a", label: "Faible", score: -2 },
          { id: "b", label: "Satisfaisant", score: 0 },
          { id: "c", label: "Bon", score: 2 }
        ]
      }
    ]
  },
  {
    id: "5",
    title: "Compréhension et mémoire",
    subQuestions: [
      {
        id: "5a",
        title: "Compréhension",
        options: [
          { id: "a", label: "Faible", score: -1 },
          { id: "b", label: "Satisfaisant", score: 0 },
          { id: "c", label: "Bon", score: 1 }
        ]
      },
      {
        id: "5b",
        title: "Mémoire",
        options: [
            { id: "a", label: "Faible", score: -1 },
            { id: "b", label: "Satisfaisant", score: 0 },
            { id: "c", label: "Bon", score: 1 }
         ]
     },
    ]
  },
  {
    id: "6",
    title: "Perception",
    subQuestions: [
      {
        id: "6a",
        title: "Trajectoire",
        options: [
          { id: "a", label: "Faible", score: -4 },
          { id: "b", label: "Satisfaisant", score: 0 },
          { id: "c", label: "Bon", score: 3 }
        ]
      },
      {
        id: "6b",
        title: "Observation",
        options: [
          { id: "a", label: "Faible", score: -1 },
          { id: "b", label: "Satisfaisant", score: 0 },
          { id: "c", label: "Bon", score: 1 }
        ]
      },
      {
        id: "6c",
        title: "Orientation",
        options: [
          { id: "a", label: "Faible", score: -1 },
          { id: "b", label: "Satisfaisant", score: 0 },
          { id: "c", label: "Bon", score: 1 },
          { id: "d", label:"Très bon", score:2},
        ]
      },
      {
        id: "6d",
        title: "Regard",
        options: [
          { id: "a", label: "F1", score: -1 },
          { id: "b", label: "F2", score: -2 },
          { id: "c", label: "F3", score: -3 }
        ]
      }
    ]
  },
  {
    id: "7",
    title: "Émotivité",
    subQuestions: [
      {
        id: "7a",
        title: "En général",
        options: [
          { id: "a", label: "Faible", score: -1 },
          { id: "b", label: "Satisfaisant", score: 0 },
          { id: "c", label: "Bon", score: 1 }
        ]
      },
      {
        id: "7b",
        title: "Crispation",
        options: [
          { id: "a", label: "Faible", score: -1 },
          { id: "b", label: "Satisfaisant", score: 0 },
          { id: "c", label: "Bon", score: 1 }
        ]
      }
    ]
  }
];

