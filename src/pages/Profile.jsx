import illustration from "../assets/placeholder-illustration.png";
import svgLinkedin from "../assets/linkedin.svg";
import svgGithub from "../assets/github.svg";

const Profile = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-10 justify-between items-center w-full h-full p-3.5">
      <div className="sm:order-1 mb-20 sm:mb-0">
        <img src={illustration} alt="" />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div>
          <p className="font-bold text-2xl">Hey there, I'm</p>
          <p className="font-bold text-orange text-3xl">Robert Apostoiu</p>
          <p className="font-semibold">
            Self taught coder with over 2 years of personal experience. Looking
            forward to work with you!
          </p>
        </div>
        <div className="flex gap-1">
          <button className="bg-orange text-white p-3 rounded-lg font-semibold">
            <a
              className="w-full"
              href="https://firebasestorage.googleapis.com/v0/b/portofolio-da5ad.appspot.com/o/cv(en).pdf?alt=media&token=68c25e21-5706-4731-a2c7-125427bf1f0f"
            >
              Open CV
            </a>
          </button>
          <button>
            <a href="#">
              <img className="w-10" src={svgLinkedin} alt="linkedin" />
            </a>
          </button>
          <button>
            <a href="https://github.com/Qualiaz">
              <img className="w-10" src={svgGithub} alt="github" />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
