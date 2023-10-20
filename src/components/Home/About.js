function About() {
  return (
    <div className="container mx-auto p-6 dark:text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Story</h1>
        <p className="text-lg mb-8">
          Nestled in the heart of the city, Storly began with a simple idea: to
          bridge the gap between timeless craftsmanship and contemporary design.
          Our journey started in a small studio filled with a handful of
          passionate artisans dedicated to bringing exceptional products to
          discerning individuals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Curated Just For You</h2>
          <p className="text-lg mb-8">
            We meticulously curate every item on Storly, ensuring they embody
            the ethos of quality, creativity, and authenticity. Our team travels
            far and wide to discover unique products that tell a compelling
            story.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Community of Creators</h2>
          <p className="text-lg mb-8">
            At Storly, we believe in the power of community. We’re more than
            just a marketplace; we’re a platform that fosters collaboration and
            supports the growth of both established and emerging creators.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-12 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Meet The Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="mb-4">
              <img
                src="https://marketplace.canva.com/EAFqNrAJpQs/1/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-WAhofEY5L1U.jpg"
                alt="Team Member 1"
                className="mx-auto rounded-full w-32 h-32"
              />
            </div>
            <h3 className="text-xl font-bold">Alice Johnson</h3>
            <p className="text-lg text-gray-700">Founder & CEO</p>
          </div>
          <div>
            <div className="mb-4">
              <img
                src="https://cdn140.picsart.com/52696599642627236248.webp?type=webp"
                alt="Team Member 2"
                className="mx-auto rounded-full w-32 h-32"
              />
            </div>
            <h3 className="text-xl font-bold">Bob Smith</h3>
            <p className="text-lg text-gray-700">Head of Curation</p>
          </div>
          <div>
            <div className="mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlaY0vxDVdf2br6KAu4YsszWMAgst_5Uj2dg&usqp=CAU"
                alt="Team Member 3"
                className="mx-auto rounded-full w-32 h-32"
              />
            </div>
            <h3 className="text-xl font-bold">Charlie Davis</h3>
            <p className="text-lg text-gray-700">Community Manager</p>
          </div>
        </div>
      </div>
      <div className=" p-12   mt-12">
        <h2 className="text-2xl font-bold mb-4 text-center">
          How We Treat Our Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-4 border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-2">Passion-Driven</h3>
            <p>
              Every product curated on Storly is a testament to our unyielding
              passion for exceptional craftsmanship and innovative design.
            </p>
          </div>
          <div className="p-4 border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-2">Quality Over Quantity</h3>
            <p>
              We prioritize the quality of the products we feature, adhering to
              a high standard that underscores our commitment to offering
              nothing but the best.
            </p>
          </div>
          <div className="p-4 border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-2">Sustainable Practices</h3>
            <p>
              We strive to promote sustainable and ethical practices by
              collaborating with creators who share our values.
            </p>
          </div>
          <div className="p-4 border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-2">Continuous Learning</h3>
            <p>
              Our journey is one of continuous learning and improvement, driven
              by feedback from our community and the evolving global
              marketplace.
            </p>
          </div>
          <div className="p-4 border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-2">Community Collaboration</h3>
            <p>
              At the heart of Storly is a vibrant community of creators and
              consumers, whose collaboration fuels our ever-evolving curated
              collections.
            </p>
          </div>
        </div>
      </div>
      <div className=" p-12   mt-12 flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div
              className="col-span-2 bg-cover bg-center h-48"
              style={{
                backgroundImage:
                  "url(https://cloudinary.hbs.edu/hbsit/image/upload/s--EmT0lNtW--/f_auto,c_fill,h_375,w_750,/v20200101/6978C1C20B650473DD135E5352D37D55.jpg)",
              }}
            ></div>
            <div
              className="bg-cover bg-center h-24"
              style={{
                backgroundImage:
                  "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmJ17kMpzZ3t2AH8icap1R-DDnMSiuPYgpnw&usqp=CAU)",
              }}
            ></div>
            <div
              className="bg-cover bg-center h-24"
              style={{
                backgroundImage:
                  "url(https://static-assets.business.amazon.com/assets/in/17th-aug-2022/910_AB_Website_Cover_1450x664_03.jpg.transform/1450x664/image.jpg)",
              }}
            ></div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Our Business Model</h2>
          <p className="text-lg mb-4">
            At Storly, we operate on a transparent and sustainable business
            model. We partner with independent creators and small businesses,
            providing a platform for them to showcase and sell their products to
            a wider audience. Our revenue comes from a small commission on
            sales, which goes back into maintaining and improving the platform
            for both sellers and buyers. By fostering a community of creativity
            and commerce, we strive to make a positive impact on the marketplace
            and beyond. Through our model, we empower creators to reach their
            full potential while providing consumers with a diverse range of
            products to choose from. As we grow, we remain committed to
            promoting ethical business practices and fostering a culture of
            continuous improvement and innovation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
