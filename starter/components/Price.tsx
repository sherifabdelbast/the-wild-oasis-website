import { getCabinPrice } from "@/starter/others/data-service";

interface PriceProps {
  cabinId: number;
}

async function Price({ cabinId }: PriceProps) {
  const price = await getCabinPrice(cabinId);
  if (!price) return null;

  const { regularPrice, discount } = price;

  return (
    <p className="mt-12 text-3xl flex gap-3 items-baseline">
      {discount > 0 ? (
        <>
          <span className="text-3xl font-[350]">
            ${regularPrice - discount}
          </span>
          <span className="line-through font-semibold text-primary-600">
            ${regularPrice}
          </span>
        </>
      ) : (
        <span className="text-3xl font-[350]">${regularPrice}</span>
      )}
      <span className="text-primary-200">/ night</span>
    </p>
  );
}

export default Price;
