import { useEffect, useState } from "react";
import { Schema, PropertyField } from "../../types";
import { getPropertyFields } from "../../util";
import { getInputType } from "../../util/mutators";

export default function InterfaceViewer({ schema }: { schema: Schema }) {
  const [interfaceData, setInterfaceData] = useState<Array<PropertyField>>(
    getPropertyFields(schema)
  );

  const handleChange = (e: any) => {
    const newData = interfaceData.map((property: PropertyField) => {
      if (property.id === e.target.name) {
        return { ...property, value: e.target.value };
      }
      return property;
    });
    setInterfaceData(newData);
  };

  useEffect(() => {
    setInterfaceData(getPropertyFields(schema));
  }, [schema]);

  return (
    <div>
      <h1>Interface Viewer</h1>
      <div>
        {interfaceData.map((property: PropertyField) => (
          <div key={property.id}>
            <label>
              {property.title} - {property.type}
              <input
                type={getInputType(property.type)}
                name={property.id}
                value={property.value}
                onChange={handleChange}
              />
              {(property.type === "number" || property.type === "integer") && (
                <input
                  type="range"
                  name={property.id}
                  value={property.value}
                  onChange={handleChange}
                />
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
