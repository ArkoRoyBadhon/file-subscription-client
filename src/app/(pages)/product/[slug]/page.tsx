import ProductDetail from "@/components/client/productDetail";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="container_main py-[40px]">
      <ProductDetail productId={params.slug} />
    </div>
  );
};

export default page;
