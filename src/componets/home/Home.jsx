import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

import Img from '../../img/intrpic.bmp';
import Img2 from '../../img/arak.bmp';
import Img3 from '../../img/chair.bmp';
import Img4 from '../../img/table.bmp';
import Img5 from '../../img/كراسى.webp';
import Img6 from '../../img/الخزائن الجنابية.webp';
import Img7 from '../../img/اسرة.webp';
import Img8 from '../../img/طاولات جانبية.webp';
import Img9 from '../../img/السجاد.webp';
import Img10 from '../../img/ارفف.webp';
import Img11 from '../../img/مكاتب.webp';
import Img12 from '../../img/مراة.webp';
import Img13 from '../../img/disco.bmp';
import Img14 from '../../img/disco2.bmp';
import Img15 from '../../img/inrs.bmp';
import Img16 from '../../img/inrs2.bmp';
import Img17 from '../../img/Verkauf_an_Interior_Designer_Haendler_Hospitality_ea8ea646-d825-46ce-b604-8f7fd5ac6d95.webp';
import Img18 from '../../img/Einrichtungsplanung_Interiors_in_Style_460fb472-effb-47d6-b0cf-2fbaf3dbf860.webp';

const categories = [
  { img: Img2, title: 'أرائك', link: '/arak' },
  { img: Img3, title: 'كرسي بذراعين', link: '/chair' },
  { img: Img4, title: 'طاولات', link: '/tables' },
  { img: Img5, title: 'كراسي', link: '/chairs' },
  { img: Img6, title: 'الخزائن الجانبية', link: '/sideboards' },
  { img: Img7, title: 'أسرّة', link: '/beds' },
  { img: Img8, title: 'طاولات جانبية', link: '/side-tables' },
  { img: Img9, title: 'السجاد', link: '/carpets' },
  { img: Img10, title: 'أرفف', link: '/shelves' },
  { img: Img11, title: 'مكاتب', link: '/desks' },
  { img: Img12, title: 'مرآة', link: '/mirrors' },
];

function CategoryCard({ item }) {
  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2 text-center mb-4">
      <Link to={item.link} className="text-decoration-none text-dark">
        <div className="category-card p-2 h-100">
          <img
            src={item.img}
            alt={item.title}
            className="img-fluid rounded shadow-sm category-image"
          />
          <p className="mt-2 mb-0 fw-semibold">{item.title}</p>
        </div>
      </Link>
    </div>
  );
}

function InfoSection({
  image,
  title,
  paragraphs,
  reverse = false,
  buttonText,
  buttonLink = '/',
}) {
  return (
    <div className={`row align-items-center my-5 ${reverse ? 'flex-md-row-reverse' : ''}`}>
      <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
        <Link to={buttonLink}>
          <img src={image} alt={title} className="img-fluid rounded shadow" />
        </Link>
      </div>

      <div className="col-12 col-md-6 text-center text-md-start">
        <h4 className="mb-3">{title}</h4>
        {paragraphs.map((text, index) => (
          <p key={index} className="mb-2">
            {text}
          </p>
        ))}

        {buttonText && (
          <Link
            to={buttonLink}
            className="btn btn-dark mt-3 px-4 py-2"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ image, title, text1, text2, buttonText, link = '/' }) {
  return (
    <div className="col-12 col-lg-6 mb-4">
      <div className="service-card h-100 p-3 rounded shadow-sm text-center text-md-start">
        <img src={image} alt={title} className="img-fluid rounded mb-3" />
        <h4 className="mb-3">{title}</h4>
        <p>{text1}</p>
        <p>{text2}</p>
        <Link to={link} className="btn btn-outline-dark mt-2">
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

function Home() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container py-4" dir="rtl">
      {/* Hero Section */}
      <div className="row align-items-center justify-content-between mb-5">
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <Link to="/asos">
            <img
              src={Img}
              alt="char-intro"
              className="img-fluid rounded shadow"
            />
          </Link>
        </div>

        <div className="col-12 col-md-6 text-center text-md-start">
          <h2 className="mb-3">تصميم داخلي حصري مع استشارة شخصية</h2>
          <p className="mb-3">
            اعثر على منتجات فريدة وحقق أحلامك في تصميم الديكور الداخلي ✓
          </p>
          <Link
            to="/contact"
            className="btn btn-dark px-4 py-2"
          >
            احصل على المشورة
          </Link>
        </div>
      </div>

      {/* Categories */}
      <section className="mb-5">
        <h2 className="text-center mb-4">أهم الفئات</h2>
        <div className="row justify-content-center">
          {categories.map((item) => (
            <CategoryCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="mb-5">
        <div className="row align-items-center text-center">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <h3 className="mb-0">اكتشف علامتنا</h3>
          </div>

          <div className="col-6 col-md-4 mb-3 mb-md-0">
            <Link to="/">
              <img src={Img13} alt="logowater" className="img-fluid brand-logo" />
            </Link>
          </div>

          <div className="col-6 col-md-4">
            <Link to="/">
              <img src={Img14} alt="logowater2" className="img-fluid brand-logo" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1 */}
      <InfoSection
        image={Img15}
        title="هل ترغب بشراء أثاث عالي الجودة عبر الإنترنت؟ من الأفضل أن تستعين بمشورة الخبراء."
        paragraphs={[
          'تصفح متجرنا لتجد أثاثًا فريدًا وإكسسوارات منزلية أنيقة يصعب العثور عليها في أماكن أخرى.',
          'قبل أن تتوجه إلى صفحة الدفع، نود أن نقدم لك النصيحة بشكل فردي حتى تتأكد من أنك تقوم بعملية الشراء الصحيحة وتستمتع بها.',
          'استعرض قائمة رغباتك معنا واطرح أسئلتك. شاركنا انطباعاتك عن شقتك مثل الصور أو المخطط.',
          'يسعدنا تقديم المشورة لك مجاناً عبر الهاتف أو البريد الإلكتروني أو واتساب أو في صالة عرضنا.',
          'أسلوب حياة أنيق من تصميم إنستيلور.',
        ]}
      />

      {/* Section 2 */}
      <InfoSection
        image={Img16}
        title="صالة عرض واستوديو تصميم في باد هومبورغ"
        paragraphs={[
          'هل تقيم في منطقة الراين-ماين أم أنك مسافر إليها؟ إذاً، تفضل بزيارة صالة عرضنا واستوديو التصميم الخاص بنا في باد هومبورغ.',
          'هنا سنقدم لك المشورة بشكل فردي وشخصي، وستحصل على انطباع عن منتجاتنا وعلاماتنا التجارية.',
          'نقدم عينات من الأقمشة والأسطح، والكتالوجات والكتيبات، وأدوات التخطيط على شاشة كبيرة، وخبرتنا في المنتجات والأثاث.',
          'أسلوب حياة أنيق من تصميم إنستيلور.',
        ]}
        reverse
      />

      {/* Service cards */}
      <section className="my-5">
        <div className="row">
          <ServiceCard
            image={Img17}
            title="تخطيط التصميم الداخلي – خدمة التصميم الداخلي"
            text1="بإمكان فريق المصممين مساعدتك في تخطيط التصميم الداخلي أو ربطك بمصمم داخلي من منطقتك."
            text2="هل تبحث عن منتجات غير متوفرة في متجرنا؟ تواصل معنا. لدينا إمكانية الوصول إلى العديد من المصنّعين الآخرين، ويمكننا توفير المنتجات التي ترغب بها."
            buttonText="إلى صالة العرض"
            link="/showroom"
          />

          <ServiceCard
            image={Img18}
            title="المبيعات للعملاء التجاريين"
            text1="يسعدنا أن نقدم مجموعة منتجاتنا لمصممي الديكور الداخلي، وتجار التجزئة، والمطورين العقاريين، والمهندسين المعماريين، والفنادق، والمطاعم بأسعار تفضيلية."
            text2="نحن ندعمك في اختيارك وننظم لك خدمات لوجستية موثوقة في جميع أنحاء العالم."
            buttonText="انضم كمشترك الآن"
            link="/register"
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter text-center mt-5 py-4 px-3 rounded shadow-sm">
        <p className="mb-3 fw-semibold">اشترك في النشرة الإخبارية من هنا</p>

        <form
          className="row justify-content-center g-2"
          onSubmit={handleSubmit}
        >
          <div className="col-12 col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="النشرة الإخبارية عبر البريد الإلكتروني"
            />
          </div>

          <div className="col-12 col-md-auto">
            <button type="submit" className="btn btn-warning w-100">
              اشترك
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Home;