import { useEffect, useState } from "react";
import gsap from "gsap";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [buttonLoader, setLoader] = useState("Submit");
  const [copyMessage, setCopyMessage] = useState("");

  const [result, setResult] = useState({
    status: "",
    shortUrl: "",
    message: "",
  });
  const colors = ["#070A5A", "#5A071F", "#074C5A", "#5A0754", "#070A5A"];
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      colors.forEach((color) => {
        tl.to(".circle", {
          backgroundColor: color,
          duration: 4,
          ease: "power1.inOut",
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setLoader(() => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
          <path
            fill="none"
            stroke="#000000ff"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="300 385"
            strokeDashoffset="0"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
          >
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              values="685;-685"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animate>
          </path>
        </svg>
      );
    });
    axios({
      url: "/",
      method: "post",
      data: { originalUrl: url },
    })
      .then((res) => {
        if (res.data.status === 200) {
          setResult({ status: 200, shortUrl: res.data.shortUrl });
        } else {
          setResult({ status: res.data.status, message: res.data.message });
        }
        setLoader("Submit");
      })
      .catch((err) => {
        setResult({
          status: 400,
          message: "There is some error in your request. Please try again.",
        });
        setLoader("Submit");
      });
  };
  const copy = () => {
    navigator.clipboard.writeText(result.shortUrl);
    setCopyMessage("Copied!");
    gsap.fromTo(
      ".success svg",
      {
        scale: 1.2,
      },
      {
        scale: 1,
        duration: 1,
        ease: "none",
      }
    );
    setTimeout(() => {
      setCopyMessage("");
    }, 3000);
  };

  return (
    <div className="hero-section">
      <div className="circle"></div>
      <div className="header">
        <div className="container">
          <img src="/logo.png"></img>
        </div>
      </div>
      <div className="content">
        <div className="container">
          <h1>
            Paste your URL to be<br></br>shortened
          </h1>
          <p>
            Shorten your long URLs with ease using our free URL shortening
            service. Create concise, shareable links in seconds!
          </p>
          <div className="spacer-30"></div>
          <div className="submit-form">
            <form>
              <input
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                placeholder="Type your url here"
                type="text"
                className="submit"
              ></input>
              <button type="submit" onClick={submit} className="submit">
                {buttonLoader}
              </button>
            </form>
          </div>
          <div className="spacer-30"></div>

          <div className="result">
            {result.status === 200 ? (
              <div className="success message">
                <p>{result.shortUrl}</p>
                <button onClick={copy}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5563 11.2183C11.514 12.2606 9.82411 12.2606 8.78171 11.2183C7.73943 10.1759 7.73943 8.486 8.78171 7.44364L11.1409 5.0845C12.1357 4.08961 13.7206 4.04433 14.7692 4.94866M14.4437 1.78175C15.486 0.739417 17.1759 0.739417 18.2183 1.78175C19.2606 2.82408 19.2606 4.51403 18.2183 5.55636L15.8591 7.9155C14.8643 8.9104 13.2794 8.9557 12.2308 8.0513M8.4999 1C5.21257 1 3.56889 1 2.46256 1.9079C2.25998 2.07414 2.07423 2.25989 1.90798 2.46247C1.00007 3.56879 1.00006 5.21247 1.00002 8.4998L1 10.9999C0.99996 14.7712 0.999951 16.6568 2.17152 17.8284C3.3431 19 5.22873 19 9 19H11.4999C14.7874 19 16.4311 19 17.5375 18.092C17.74 17.9258 17.9257 17.7401 18.092 17.5376C18.9999 16.4312 18.9999 14.7875 18.9999 11.5"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {copyMessage ? (
                  <span className="copy-message">{copyMessage}</span>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div></div>
            )}
            {result.status === 400 ? (
              <div className="failed message">
                <p>{result.message}</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <div className="credits">
        <a href="https://nihirchandila.in" target="_blank">
          <img src="/coding.png"></img>
        </a>
        <a href="https://nihirchandila.in" target="_blank">
          <p>Nihir</p>
        </a>
      </div>
    </div>
  );
}
