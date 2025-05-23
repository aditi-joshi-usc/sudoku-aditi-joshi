export function Cell({ value, readOnly, onChange }) {
  // Handle input changes: only accept digits 1–9
  const handleInputChange = (event) => {
    const input = event.target.value;
    const number = parseInt(input);

    if (!isNaN(number) && number >= 1 && number <= 9) {
      onChange(number);
    } else {
      onChange(null);
    }
  };

  return (
    <input
      className={`cell ${readOnly ? 'readonly' : ''}`} type="text" value={value ?? ''} onChange={handleInputChange} readOnly={readOnly} maxLength={1}
    />
  );
}
