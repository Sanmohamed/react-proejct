import React from 'react';
import './home.css';
import Img from '../../img/intrpic.bmp';
import { Link } from 'react-router-dom';
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
  { img: Img2, title: "أرائك" },
  { img: Img3, title: "كرسي بذراعين" },
  { img: Img4, title: "طاولات" },
  { img: Img5, title: "كراسي" },
  { img: Img6, title: "الخزائن الجانبية" },
  { img: Img7, title: "أسرّة" },
  { img: Img8, title: "طاولات جانبية" },
  { img: Img9, title: "السجاد" },
  { img: Img10, title: "أرفف" },
  { img: Img11, title: "مكاتب" },
  { img: Img12, title: "مرآة" },
];


function Home() {

  return (
    <div className="container" >
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">

        <div className="">
          <Link to="/Assas">
            <img
              src={Img}
              alt="char-intro"
              className="w-75 w-md-50"
            />
          </Link>
        </div>
        <div className="first-t d-flex flex-column w-50 text-center text-md-start">
          <h2>تصميم داخلي حصري مع استشارة شخصية</h2>
          <p>اعثر على منتجات فريدة وحقق أحلامك في تصميم الديكور الداخلي ✓</p>
          <Link
            to="/contact"
            className="mx-auto mt-3 p-2 bg-dark text-light text-decoration-none">
            احصل على المشورة
          </Link>
        </div>
      </div>
      <h2 className='text-center mb-4'>أهم الفئات</h2>
      <div className='row'>
        {categories.map((item, index) => (
          <div key={index} className="col-6 col-md-3 text-center mb-4">
            <Link to="/arak">
              <img src={item.img} alt={item.title} className="card img-fluid w-75" />
            </Link>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className='d-flex justify-content-between'>
        <h3>اكتشف علامتنا</h3>
        <Link to="/">
          <img src={Img13} alt="logowater" className='w-75 ' />
        </Link>
        <Link to="/">
          <img src={Img14} alt="logowater2" className='w-75 ' />
        </Link>
      </div>
      <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mt-4'>
        <Link to="/">
         <img
         src={Img15}
          alt="char-intro"
           className="w-50 "
          />
        </Link>
        <div className="second-t d-flex flex-column w-50 text-center text-md-start">
          <h4>هل ترغب بشراء أثاث عالي الجودة عبر الإنترنت؟ من الأفضل أن تستعين بمشورة الخبراء.</h4>
          <p>تصفح متجرنا لتجد أثاثًا فريدًا وإكسسوارات منزلية أنيقة يصعب العثور عليها في أماكن أخرى. </p>
          <p>قبل أن "تتوجه إلى صفحة الدفع"، نود أن نقدم لك النصيحة بشكل فردي حتى تتأكد من أنك تقوم بعملية الشراء الصحيحة وتستمتع بها. </p>
          <p>استعرض قائمة رغباتك معنا واطرح أسئلتك. شاركنا انطباعاتك عن شقتك (مثلاً، صور أو مخطط). يسعدنا تقديم المشورة لك مجاناً عبر الهاتف أو البريد الإلكتروني أو واتساب أو في صالة عرضنا.</p>
          <p>أسلوب حياة أنيق من تصميم إنستيلور</p>
        </div>
      </div>

      <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mt-4'>

          <Link to="/">
          <img
            src={Img16}
            alt="char-intro"
            className="w-50"
          />
        </Link>
        <div className="second-t d-flex flex-column w-50 text-center text-md-start">
          <h4>صالة عرض واستوديو تصميم في باد هومبورغ</h4>
          <p>هل تقيم في منطقة الراين-ماين أم أنك مسافر إليها؟ إذاً، تفضل بزيارة صالة عرضنا واستوديو التصميم الخاص بنا في باد هومبورغ.</p>
          <p>هنا سنقدم لك المشورة بشكل فردي وشخصي، وستحصل على انطباع عن منتجاتنا وعلاماتنا التجارية. </p>
          <p>نقدم عينات من الأقمشة والأسطح، والكتالوجات والكتيبات، وأدوات التخطيط على شاشة كبيرة، وخبرتنا في المنتجات والأثاث. </p>
          <p>أسلوب حياة أنيق من تصميم إنستيلور</p>
        </div>
      
      </div>
      <div className='d-flex justify-content-between mt-4 '>
        <div className='flex-column'>
          <img src={Img17} alt="fsas" className='w-75' />
          <h4>تخطيط التصميم الداخلي – خدمة التصميم الداخلي</h4>
          <p>بإمكان فريق المصممين مساعدتك في تخطيط التصميم الداخلي أو ربطك بمصمم داخلي من منطقتك</p>
          <p>
         هل تبحث عن منتجات غير متوفرة في متجرنا؟ تواصل معنا. لدينا إمكانية الوصول إلى العديد من المصنّعين الآخرين، ويمكننا توفير المنتجات التي ترغب بها. </p>
         <Link to="/"className="mx-auto mt-3 p-2 bg-white text-dark text-decoration-none" >
          الي صالة العرض
          </Link>
        </div>
        <div>
          <img src={Img18} alt="fsas" className='w-75' />
          <h4>المبيعات للعملاء التجاريين</h4>
          <p>يسعدنا أن نقدم مجموعة منتجاتنا لمصممي الديكور الداخلي، وتجار التجزئة، والمطورين العقاريين، والمهندسين المعماريين، والفنادق، والمطاعم بأسعار تفضيلية.</p>
          <p>نحن ندعمك في اختيارك وننظم لك خدمات لوجستية موثوقة في جميع أنحاء العالم</p>
          <Link to="/" className="mx-auto mt-3 p-2 bg-white text-dark text-decoration-none">
            انضم كمشترك الان
          </Link>
        </div>
      </div>
       <div className='d-flex justify-content-center align-items-center'>
         <div>
           <p> اشترك في النشرة الإخبارية من هنا</p>
         </div>
          <form action="" method="get">
            <input type="text" name='news' id='ns' className='position-relative' placeholder='النشرة الاخبارية عبر البريد الاكترونى'/>
            <button className='position-absolute bg-warning'>اشترك</button>
          </form>
       </div>
    </div>
  );
}

export default Home;