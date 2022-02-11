const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-text">
        ©{currentYear === 2022 ? currentYear : `2022-${currentYear}`},
        <a className="footer-link" href="https://github.com/Julien-B-py">
          {" Julien BEAUJOIN "}
          <i className="fab fa-github"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
