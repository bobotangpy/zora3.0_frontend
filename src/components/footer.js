const Footer = () => {
  return (
    <div className="bg">
      <p>&#169; 2021 Zora</p>

      <style jsx>
        {`
          .bg {
            background-color: #f7f7f7;
            max-width: 100%;
          }

          .bg p {
            margin: 0;
            padding: 1rem 2rem;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default Footer;
