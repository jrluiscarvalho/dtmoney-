import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions';
import { Container, TransactionTypeContainer, RadioBox } from './styles'

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  const { createTransaction } = useTransactions(); 

  async function handlerCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount: value,
      category, 
      type
    })

    setTitle('')
    setValue(0)
    setCategory('')
    setType('deposit')
    onRequestClose()
  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar Modal"/>
      </button>

      <Container onSubmit={handlerCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input 
          type="text"
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="Titulo"
        />

        <input 
          type="number"
          value={value}
          onChange={event => setValue(Number(event.target.value))}
          placeholder="Valor"
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button" 
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
          >
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button" 
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
          >
            <img src={outcomeImg} alt="Saida"/>
            <span>Saida</span>
          </RadioBox>

        </TransactionTypeContainer>

        <input 
          type="text"
          value={category}
          onChange={event => setCategory(event.target.value)}
          placeholder="Categoria"
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}