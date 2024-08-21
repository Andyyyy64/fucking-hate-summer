import { Request, Response } from 'express';
import db from '../utiles/database'

type Data = {
    tmp: number;
    hum: number;
    location: string;
}

export const addData = async (req: Request, res: Response): Promise<void> => {
  const { tmp, hum, location }: Data = req.body;
  try {
    await db.run("INSERT INTO data (tmp, hum, location) VALUES ($1, $2, $3)", [
      tmp,
      hum,
      location,
    ]);
    res.json({ message: "Data added successfully" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Failed to add data" });
  }
};
