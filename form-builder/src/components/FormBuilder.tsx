// src/components/FormBuilder.tsx
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const fieldTypes = [
  "Text Input",
  "Number Input",
  "Date Picker",
  "Checkbox",
  "Dropdown Select",
  "Radio Buttons",
];

const FormBuilder = () => {
  const [formFields, setFormFields] = useState<any[]>([]);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const handleFieldDrop = (item: string) => {
    const newField = {
      id: uuidv4(),
      type: item,
      label: "",
      placeholder: "",
      required: false,
      options:
        item === "Dropdown Select" || item === "Radio Buttons" ? [] : undefined,
    };
    setFormFields([...formFields, newField]);
  };

  const removeField = (id: string) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  const handleSaveForm = async () => {
    try {
      const formData = {
        title: formTitle,
        description: formDescription,
        fields: formFields,
      };
      const response = await axios.post(
        "http://localhost:5000/api/forms",
        formData
      );
      alert("Form saved with ID: " + response.data.formId);
    } catch (error) {
      console.error("Error saving form", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Form Title"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
      />
      <textarea
        placeholder="Form Description"
        value={formDescription}
        onChange={(e) => setFormDescription(e.target.value)}
      />
      <div className="drag-area">
        {fieldTypes.map((type) => (
          <div
            key={type}
            className="drag-item"
            onDragEnd={() => handleFieldDrop(type)}
            draggable
          >
            {type}
          </div>
        ))}
      </div>
      <div className="form-builder">
        {formFields.map((field) => (
          <div key={field.id} className="form-field">
            <input
              type="text"
              placeholder="Label"
              onChange={(e) => (field.label = e.target.value)}
            />
            <input
              type="text"
              placeholder="Placeholder"
              onChange={(e) => (field.placeholder = e.target.value)}
            />
            <button onClick={() => removeField(field.id)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleSaveForm}>Save Form</button>
    </div>
  );
};

export default FormBuilder;
