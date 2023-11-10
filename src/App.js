import { useCallback, useState } from 'react';
import './App.css';

function App() {

  const [theme, setTheme] = useState('');
  const [adding, setAdding] = useState('');
  const [items, setItems] = useState([]);

  const getColor = useCallback(() => {
    if (items.length >= 10) return 'green';
    if (items.length >= 5) return 'orange';
    return 'red';
  }, [items]);

  const getImage = useCallback(() => {
    if (items.length >= 10) return 'https://assets.epuzzle.info/puzzle/079/716/original.jpg';
    if (items.length >= 5) return 'https://us-tuna-sounds-images.voicemod.net/31c316d4-2f90-4e7c-bca1-dfb899f7023d-1685558713339.png';
    return 'https://cdn.pnghd.pics/data/893/screaming-cat-meme-1.jpg';
  }, [items]);

  return (
    <div className="App">
      <header className="app__header">
        <h1>Let's organize / prepare a(n): </h1>
        <input value={theme} className='app__input form-control' onChange={(e) => setTheme(e.target.value)}/>
      </header>
      <main className="app__main">
        <form className="app__form" onSubmit={(e) => {
            e.preventDefault();
            if (adding === '') return;
            if (items.includes(adding)) return;
            setItems([...items, adding]);
            setAdding('');
          }}>
          <span>What do we need?</span>
          <input type="text" className="form-control" value={adding} onChange={(e) => setAdding(e.target.value)} placeholder="Add something to the list!"/>
          <button className='app__btn btn' type='submit'>Add to the list</button>
          <button className='app__btn app__btn--reverse btn' onClick={() => setItems([])}>Clear list</button>
        </form>
        <div className='app__grid'>
          <div className='left'>
            <div className='app__items'>
              {items.map(item => (
                <span className='app__item'>{ item }</span>
              ))}
            </div>
          </div>
          <div className='right'>
            <span className='app__total' style={{
              color: getColor()
            }}>Total items in the list: { items.length }</span>
            <img className='app__img' src={getImage()} alt="Cat"/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
