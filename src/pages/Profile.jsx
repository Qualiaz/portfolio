import bg from "../assets/bg-orange-vector.svg";
import illustration from "../assets/placeholder-illustration.png";

const Profile = () => {
  return (
    <div className="profile flex flex-col items-center justify-center h-full p-3">
      <div className="illustration mb-10">
        <img src={illustration} alt="" />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div>
          <p className="font-bold text-2xl">Hey there, I'm</p>
          <p className="font-bold text-orange text-3xl">Robert Apostoiu</p>
          <p className="font-semibold">
            Self-thought coder with over 2 years of experience. Looking forward
            to work with you!
          </p>
        </div>
        <div className="">
          <button className="bg-orange text-white p-3 rounded-lg">
            Hire me
          </button>
        </div>
        <div>
          <p>Download CV</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
