import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";

const titles = {
  asos: "أثاث",
  "sofas": "أرائك",
  "standard-sofas": "أرائك معيارية",
  "armchairs": "كراسى بذراعين",
  "recliners": "كراسي استرخاء",
  "coffee-tables": "طاولات قهوة",
  "armchair": "كرسي",
  "media-cabinets": "خزائن جانبية للوسائط",
  "cabinets": "خزائن",
  "dining-tables": "طاولات الطعام",
  "dining-chairs": "كراسي طعام",
  "side-tables": "طاولات جانبية",
  "bar-cabinets": "خزائن بار",
  "display-cabinets": "خزائن عرض",
  "gaming-sets": "مجموعات ألعاب",
  "beds": "أسرة",
  "bed-headboards": "رأس سرير",
  "bedside-tables": "طاولات جانبيّة للسرير",
  "drawer-cabinets": "خزائن صناديق",
  "bedroom-seatings": "مقاعد غرف النوم",
  "decoration-tables": "طاولات زينة",
  "dog-beds": "أسرة كلاب",
  "offices": "مكاتب",
  "office-chairs": "كراسي مكتب",
  "bookcases": "أرفف كتب",
  mirror: "مرآة",
  "rectangular": "مستطيل",
  "circular": "دائري",
  "oval": "بيضاوي",
  "standard": "معيارية",
  "irregular": "غير منتظمة",
  decor: "ديكور",
  "flower-pots": "أوعية زهرية",
  "skulpturen": "نقوش",
  "tische": "طاولات",
  "photos": "صور",
  "vases": "مزهريات",
  "artworks": "أعمال فنية",
  "platforms": "منصات",
  carpets: "سجاد",
  "square": "مربع",
  lighting: "إضاءة",
  "floor-lamps": "مصابيح أرضية",
  "table-lamps": "مصابيح طاولة",
  "wall-lamps": "مصابيح حائط",
  "ceiling-lights": "أضواء سقف",
  brands: "ماركات",
  "semi-circle": "نصف دائرة",
  "christopher": "كريستوفر",
  "adriana-huey": "أدريانا هيوي",
  "deco-bubble": "ديكو بابل",
};

function CategoryPage() {
  const { category, subCategory } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addedId, setAddedId] = useState(null);


  useEffect(() => {
    setPage(1);
    setKeyword("");
  }, [category, subCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        let url = `http://localhost:5000/api/products?category=${category}&page=${page}&limit=8`;
        if (subCategory) url += `&subCategory=${subCategory}`;
        if (keyword) url += `&search=${keyword}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("فشل تحميل المنتجات");

        const data = await res.json();
        setProducts(Array.isArray(data.products) ? data.products : []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError("فشل تحميل المنتجات، يرجى المحاولة مرة أخرى");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subCategory, page, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); 
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const pageTitle = subCategory
    ? `${titles[category] || category} / ${titles[subCategory] || subCategory}`
    : titles[category] || category;

  return (
    <div className="container mt-4">

      
      <form className="d-flex mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="ابحث عن منتج..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-dark" type="submit">
          <i className="bi bi-search fs-5"></i>
        </button>
      </form>

      <h3>{pageTitle}</h3>
      <hr />

      {error && <p className="text-danger text-center">{error}</p>}

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-muted mt-5">
          لا توجد منتجات في هذه الفئة
        </p>
      ) : (
        <div className="row">
          {products.map(product => (
            <div className="col-md-3 mb-4" key={product._id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.price} جنيه</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex flex-column gap-2">
                  <Button
                    className="btn btn-dark w-100"
                    onClick={() => handleAddToCart(product)}
                    disabled={addedId === product._id}
                  >
                    {addedId === product._id ? "✓ تمت الإضافة" : "أضف إلى السلة"}
                  </Button>
                  <button
                    className={`btn w-100 ${isFavorite(product._id) ? "btn-danger" : "btn-outline-danger"}`}
                    onClick={() =>
                      isFavorite(product._id)
                        ? removeFromFavorites(product._id)
                        : addToFavorites(product)
                    }
                  >
                    {isFavorite(product._id) ? "💔 إزالة من المفضلة" : "❤️ أضف للمفضلة"}
                  </button>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="mx-2"
          >
            السابق
          </Button>
          <span className="mx-2 align-self-center">
            {page} / {totalPages}
          </span>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="mx-2"
          >
            التالي
          </Button>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;