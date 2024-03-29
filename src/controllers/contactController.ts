import { Request, Response } from "express";
import { Contact } from '../models/contactModel'
import sendMail from "../services/sendMail";


type ContactForm = {
  name: string,
  email: string,
  message: string,
}

export const submitContactForm = async (req:Request, res: Response) => {
  try {
    const body: ContactForm = req.body as ContactForm;
    const { name, email, message } = body
    
    console.log(body);

    // Save the form data to the database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    //Send an email
    await sendMail(body);

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  submitContactForm,
};
