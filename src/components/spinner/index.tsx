import { ProgressBar } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className="hd absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <ProgressBar
        height="150"
        width="150"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#03ac13"
        barColor="#03c04a"
      />
    </div>
  );
}
