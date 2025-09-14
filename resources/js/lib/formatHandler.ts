class FormatHandler {
  cleanSearchArgument = (value: string) => {
    return value
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };
  formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  };

  formatCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length !== 11) return value;

    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  captalizeFirstLetter = (value: string) => {
    const firstLetter = value.slice(0, 1);

    return firstLetter.toUpperCase() + value.slice(1);
  };

  formatDate = (value: string | undefined | null) => {
    if (!value) return "N/A";
    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
}

export default new FormatHandler();
