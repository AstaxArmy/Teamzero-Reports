interface FormInputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  multiline?: boolean
  rows?: number
}

export function FormInput({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  multiline = false,
  rows = 4,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-purple">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          rows={rows}
          className="w-full rounded-xl px-4 py-3 text-sm resize-none"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl px-4 py-3 text-sm"
        />
      )}
    </div>
  )
}

interface FormSelectProps {
  label: string
  name: string
  options: string[]
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function FormSelect({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-purple">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl px-4 py-3 text-sm cursor-pointer"
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

interface FormToggleProps {
  label: string
  name: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FormToggle({ label, name, checked, onChange }: FormToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-bg-input border border-border-subtle">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple"></div>
      </label>
    </div>
  )
}

interface FormRadioGroupProps {
  label: string
  name: string
  options: string[]
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FormRadioGroup({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
}: FormRadioGroupProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-purple">*</span>}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center justify-center px-4 py-2 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
              value === opt
                ? 'border-purple bg-purple/10 text-purple'
                : 'border-border-subtle text-gray-400 hover:border-purple/50 hover:text-white'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={onChange}
              className="sr-only"
              required={required}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}

interface FormYesNoProps {
  label: string
  name: string
  required?: boolean
}

export function FormYesNo({ label, name, required = false }: FormYesNoProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-purple">*</span>}
      </label>
      <div className="flex gap-3">
        {['Yes', 'No'].map((opt) => (
          <label
            key={opt}
            className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl border border-border-subtle cursor-pointer text-sm font-medium text-gray-400 hover:border-purple/50 transition-all has-[:checked]:border-purple has-[:checked]:bg-purple/10 has-[:checked]:text-purple"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              className="sr-only"
              required={required}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}
