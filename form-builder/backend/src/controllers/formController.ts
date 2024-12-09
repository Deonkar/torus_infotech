// backend/src/controllers/formController.ts
import { createForm, getFormById } from "../services/formService";

export const saveForm = async (req: any, res: any) => {
  const formData = req.body;
  try {
    const formId = await createForm(formData);
    res.status(200).json({ formId });
  } catch (error) {
    res.status(500).json({ message: "Error saving form" });
  }
};

export const getForm = async (req: any, res: any) => {
  const formId = req.params.formId;
  try {
    const form = await getFormById(formId);
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form" });
  }
};
