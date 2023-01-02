import s from "./Preloader.module.css";

const Preloader = () => {
    return (
        <div className={s.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Preloader;
