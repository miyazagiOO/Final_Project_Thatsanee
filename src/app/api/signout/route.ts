import { signOut } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signoutRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
      await signOut({});
  }
}
