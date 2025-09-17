import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function FormInput({ 
  id, 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  required = false,
  multiline = false,
  rows = 3,
  helperText,
  maxLength 
}) {
  const InputComponent = multiline ? Textarea : Input;
  
  return (
    <div>
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <InputComponent
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={multiline ? rows : undefined}
      />
      {helperText && (
        <p className="text-xs text-muted-foreground mt-1">{helperText}</p>
      )}
      {maxLength && (
        <p className="text-xs text-muted-foreground mt-1">
          {value.length}/{maxLength} characters
        </p>
      )}
    </div>
  );
}
