import { Request, Response } from 'express';
import db from '../utiles/database'

type Data = {
    temp: number;
    humi: number;
}

export const addData = async (req: Request, res: Response): Promise<void> => {
  const { temp, humi }: Data = req.body;
  const location = "home";
  const created_at = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", hour12: false });
  try {
    await db.run("INSERT INTO data (temp, humi, created_at, location) VALUES ($1, $2, $3, $4)", [
      temp,
      humi,
      created_at,
      location,
    ]);
    res.json({ message: "Data added successfully" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Failed to add data" });
  }
};
