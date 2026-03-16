import React, { useEffect, useState, useContext } from "react";
import { Table, Button, Form, Alert, Spinner, Card, Row, Col } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

const categoryOptions = {
  asos: {
    label: "أثاث",
    sub: [
      { value: "sofas", label: "أرائك" },
      { value: "standard-sofas", label: "أرائك معيارية" },
      { value: "armchairs", label: "كرسى بذراعين" },
      { value: "recliners", label: "كراسي استرخاء" },
      { value: "coffee-tables", label: "طاولات قهوة" },
      { value: "side-tables", label: "طاولات جانبية" },
      { value: "media-cabinet", label: "خزائن جانبية للوسائط" },
      { value: "cabinets", label: "خزائن" },
      { value: "dining-tables", label: "طاولات طعام" },
      { value: "dining-chairs", label: "كراسي طعام" },
      { value: "bar-cabinets", label: "خزائن للبار" },
      { value: "display-cabinets", label: "خزائن عرض" },
      { value: "gaming-sets", label: "مجموعات ألعاب" },
      { value: "beds", label: "أسرة" },
      { value: "bed-headboards", label: "رأس سرير" },
      { value: "bedside-tables", label: "طاولة جانبية للسرير" },
      { value: "drawer-cabinets", label: "خزائن صناديق" },
      { value: "bedroom-seatings", label: "مُقاعد غرف النوم" },
      { value: "offices", label: "مكاتب" },
      { value: "office-chairs", label: "كراسي مكتب" },
      { value: "bookcases", label: "خزائن كتب" }
    ]
  },
  mirror: {
    label: "مرايا",
    sub: [
      { value: "rectangular", label: "مستطيل" },
      { value: "circular", label: "دائرية" },
      { value: "standard", label: "معيارية" },
      { value: "irregular", label: "غير منتظمة" },
      { value: "oval", label: "بيضاوية" }
    ]
  },
  decor: {
    label: "ديكور",
    sub: [
      { value: "flower-pots", label: "أوعية زهرية" },
      { value: "skulpturen", label: "نقوش" },
      { value: "vases", label: "مزهريات" },
      { value: "artworks", label: "أعمال فنية" },
      { value: "platforms", label: "منصات" }
    ]
  },
  carpets: {
    label: "سجاد",
    sub: [
      { value: "square", label: "مربع" },
      { value: "rectangular", label: "مستطيل" },
      { value: "circular", label: "دائري" }
    ]
  },
  lighting: {
    label: "إضاءة",
    sub: [
      { value: "floor-lamps", label: "مصابيح أرضية" },
      { value: "table-lamps", label: "مصابيح طاولة" },
      { value: "wall-lamps", label: "مصابيح حائط" },
      { value: "ceiling-lights", label: "أضواء سقف" }
    ]
  },
  brands: {
    label: "ماركات",
    sub: [
      { value: "semi-circle", label: "نصف دائري" },
      { value: "christopher", label: "كريستوفر" },
      { value: "adriana-huey", label: "أدريانا هيوي" },
      { value: "deco-bubble", label: "ديكو بابل" }
    ]
  }
};

function AdminDashboard() {
  const { user } = useContext(CartContext);
  const token = user?.token;

  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubs, setSelectedSubs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: 0,
  });

 
  const fetchProducts = async (pageNumber = 1) => {
    try {
      setPageLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/products?page=${pageNumber}&limit=5`
      );
      const data = await res.json();
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      setError("فشل تحميل المنتجات");
    } finally {
      setPageLoading(false);
    }
  };


  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const res = await fetch("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setStats(data);
    } catch {
      setError("فشل تحميل الإحصائيات");
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    fetchStats();
  }, []);

 
  const handleSubChange = (value) => {
    setSelectedSubs(prev =>
      prev.includes(value)
        ? prev.filter(i => i !== value)
        : [...prev, value]
    );
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.price || !selectedCategory) {
      return setError("يرجى ملء جميع الحقول المطلوبة");
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("stock", formData.stock);
      form.append("category", selectedCategory);
      selectedSubs.forEach(sub => form.append("subCategory", sub));
      if (image) form.append("image", image);

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form
      });

      if (!res.ok) {
        const err = await res.json();
        return setError(err.message || "فشل إضافة المنتج");
      }

      setSuccess("تمت إضافة المنتج بنجاح");
      setFormData({ name: "", price: "", stock: 0 });
      setSelectedCategory("");
      setSelectedSubs([]);
      setImage(null);
      fetchProducts(page);
      fetchStats();
    } catch {
      setError("حدث خطأ أثناء الإضافة");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد؟")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const err = await res.json();
        return setError(err.message || "فشل الحذف");
      }

      setSuccess("تم الحذف بنجاح");
      fetchProducts(page);
      fetchStats();
    } catch {
      setError("فشل الحذف");
    }
  };

  return (
    <div className="container mt-5">
      <h2>لوحة تحكم الأدمن</h2>
      <hr />

      {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess("")}>{success}</Alert>}
      <Row className="mb-4">
        {statsLoading ? <Spinner animation="border" /> : (
          <>
            <Col md={3}>
              <Card body className="text-center">
                <h6>المنتجات</h6>
                <h4>{stats.productsCount ?? 0}</h4>
              </Card>
            </Col>
            <Col md={3}>
              <Card body className="text-center">
                <h6>المستخدمين</h6>
                <h4>{stats.usersCount ?? 0}</h4>
              </Card>
            </Col>
            <Col md={3}>
              <Card body className="text-center">
                <h6>الطلبات</h6>
                <h4>{stats.ordersCount ?? 0}</h4>
              </Card>
            </Col>
            <Col md={3}>
              <Card body className="text-center">
                <h6>المبيعات</h6>
                <h4>{stats.totalSales ?? 0} جنيه</h4>
              </Card>
            </Col>
          </>
        )}
      </Row>


      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Control
          placeholder="اسم المنتج"
          className="mb-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Form.Control
          type="number"
          placeholder="السعر"
          className="mb-2"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <Form.Control
          type="number"
          placeholder="الكمية"
          className="mb-2"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />


        <Form.Select
          className="mb-3"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubs([]);
          }}
        >
          <option value="">اختر الفئة</option>
          {Object.keys(categoryOptions).map(key => (
            <option key={key} value={key}>
              {categoryOptions[key].label}
            </option>
          ))}
        </Form.Select>

      
        {selectedCategory && (
          <div className="mb-3 border rounded p-3">
            <strong className="d-block mb-2">اختر النوع:</strong>
            <Row>
              {categoryOptions[selectedCategory].sub.map(sub => (
                <Col md={4} key={sub.value}>
                  <Form.Check
                    type="checkbox"
                    label={sub.label}
                    value={sub.value}
                    checked={selectedSubs.includes(sub.value)}
                    onChange={() => handleSubChange(sub.value)}
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}

        <Form.Control
          type="file"
          className="mb-3"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "إضافة منتج"}
        </Button>
      </Form>


      {pageLoading ? <Spinner animation="border" /> : (
        <Table bordered responsive>
          <thead className="table-dark">
            <tr>
              <th>الصورة</th>
              <th>الاسم</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>الفئة</th>
              <th>الأنواع</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  لا توجد منتجات
                </td>
              </tr>
            ) : (
              products.map(p => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={`http://localhost:5000${p.image}`}
                      width="60"
                      alt={p.name}
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.price} جنيه</td>
                  <td>{p.stock ?? 0}</td>
                  <td>{p.category}</td>
                  <td>
                    {Array.isArray(p.subCategory)
                      ? p.subCategory.join(", ")
                      : p.subCategory}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(p._id)}
                    >
                      حذف
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* PAGINATION */}
      <div className="d-flex justify-content-center gap-3 mt-3">
        <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          السابق
        </Button>
        <span className="align-self-center">
          صفحة {page} من {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          التالي
        </Button>
      </div>
    </div>
  );
}

export default AdminDashboard;