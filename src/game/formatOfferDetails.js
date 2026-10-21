import { fmt } from "./fmt.js";

export const formatOfferDetails = (type, v, con, meta, swapIds, players) => {
  let details = [];
  if (v > 0) details.push(`💰 Valor: ${fmt(v)}`);
  if (meta.installments > 1)
    details.push(
      `📅 Parcelamento: ${meta.installments}x de ${fmt(v / meta.installments)}`,
    );
  if (type !== "TROCA") details.push(`📝 Contrato: ${con} Temporadas`);
  if (type === "COMPRA" && meta.sellOn > 0)
    details.push(`📈 Revenda: ${meta.sellOn}% futura venda`);
  if (type === "EMPRESTIMO") {
    details.push(`💸 Salários: Comprador paga ${meta.wageSplit}%`);
    if (meta.buyOpt > 0)
      details.push(`🛒 Opção de Compra: ${fmt(meta.buyOpt)}`);
  }
  if (type === "TROCA") {
    if (swapIds && swapIds.length > 0) {
      const swapNames = swapIds
        .map((id) => players.find((p) => p.id === id)?.name)
        .join(", ");
      details.push(`🔄 Troca por: ${swapNames}`);
    }
    if (v > 0)
      details.push(
        `💵 Volta: ${meta.cashDir === "PAY" ? "Eu pago" : "Eu recebo"} ${fmt(v)}`,
      );
  }
  return details.join("\n");
};
