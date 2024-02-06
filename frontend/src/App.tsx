import './App.css'
import { TablaOrdenes } from './components/TablaOrdenes';
import { Title } from '@tremor/react';
import {Toaster} from 'sonner'
import { Form } from './components/Form';

function App() {
  
  return (
    <>
      <header>
        <Title color={'stone'}>Ordenes AssistASAP</Title>
      </header>
      <main>
        <TablaOrdenes/>
        <Form/>
        <Toaster richColors />
      </main>
    </>
  )
}

export default App
