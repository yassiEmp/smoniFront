import { apiUrl } from "..";

export async function makeSubscribe({ mode, transaction, service_id, token }: { mode: string, transaction: string, service_id: number, token: string }) {
    const res = await fetch(`${apiUrl}services/makeSubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ mode, transaction, service_id })
    });
    if (!res.ok) throw new Error('Erreur lors de la souscription');
    return res.json();
  }

export async function makeSubscribeWithLearnerId({ mode, transaction, service_id, token, learner_id }: { mode: string, transaction: string, service_id: number, token: string, learner_id: number }) {
    const res = await fetch(`${apiUrl}services/makeSubscribeWithLearner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ mode, transaction, service_id, learner_id })
    });
    if (!res.ok) throw new Error('Erreur lors de la souscription');
    return res.json();
  }

export async function deactivateSubscription({ subscription_id, token }: { subscription_id: number, token: string }) {
    const res = await fetch(`${apiUrl}subscriptions/${subscription_id}/deactivate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Erreur lors de la désactivation');
    return res.json();
  }