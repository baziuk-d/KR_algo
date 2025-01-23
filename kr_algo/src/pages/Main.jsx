import { Link } from "react-router-dom";
import "../styles/Main.css";

const Main = () => {
    return (
        <div className="main">
            <h1>Алгоритми та структури даних</h1>
            <h2>Варіант 2</h2>
            <div className="main-content">
                Виконав студент групи ІР-22 <br /> <strong>Базюк Дам'ян</strong>
            </div>
            <h3 className="description">Опис завдання:</h3>
            <div>
                Спосіб задання графу: <strong>список ребер</strong> <br />
                Тип графу: <strong>ненаправлений, незважений</strong> <br />
                Алгоритм обходу графу або задача: <strong>пошук в глибину</strong>
                <br />
                Структура даних: <strong>АВЛ дерево</strong>
            </div>
            <div className='mainButtons'>
            <Link className="main button" to={"/home"}>
                Пошук в глибину в графі
            </Link>
            <Link className="main button" to={"/avl"}>
                Структура даних
            </Link>
            </div>
        </div>
    );
};

export default Main;
