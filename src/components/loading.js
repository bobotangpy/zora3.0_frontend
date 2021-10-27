const Loading = () => {
  return (
    <div className="loading">
      <img src="/assets/images/loading.svg" alt="loading" />

      <style jsx>
        {`
          .loading {
            overflow: hidden;
            position: fixed;
            z-index: 1400;
            inset: 0px;
            background-color: rgba(250, 250, 250, 0.4);
            -webkit-tap-highlight-color: transparent;
          }
          .loading img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
