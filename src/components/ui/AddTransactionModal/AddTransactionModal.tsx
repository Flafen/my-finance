import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Form, Button } from 'react-bootstrap';
import styles from './AddTransactionModal.module.scss';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { newTransaction } from '../../../store/slices/userInfoSlice';

export interface Transaction {
  date: Date;
  amount: number;
  action: 'deposit' | 'withdraw';
  category:
    | 'Food'
    | 'Transport'
    | 'Healthcare'
    | 'Education'
    | 'Shops'
    | 'Entertaiment'
    | 'Other'
    | undefined;
}

interface AddTransactionModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Transaction>();

  const transactions = useAppSelector(
    (state) => state.userInfo.transactionHistory
  );

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Transaction> = (data) => {
    data = {
      ...data,
      date: new Date(data.date),
      amount: Number(data.amount),
    };
    console.log(data);
    dispatch(newTransaction(data));
    reset();
    setShowModal(false);
  };

  const categories = [
    'Food',
    'Transport',
    'Healthcare',
    'Education',
    'Shops',
    'Entertainment',
    'Other',
  ];

  const handleClose = () => {
    reset();
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      centered
      contentClassName={styles.modalContent}
      backdropClassName={styles.modalBackdrop}
    >
      <Modal.Header
        closeButton
        className={styles.modalHeader}
      >
        <Modal.Title>
          <span
            role="img"
            aria-label="add"
          >
            ➕
          </span>{' '}
          Add Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              {...register('date', { required: 'Date is required' })}
              defaultValue={new Date().toISOString().split('T')[0]}
              isInvalid={!!errors.date}
              className={styles.inputField}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              {...register('amount', {
                required: 'Amount is required',
                min: { value: 0.01, message: 'Amount must be greater than 0' },
              })}
              isInvalid={!!errors.amount}
              className={styles.inputField}
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Action</Form.Label>
            <Form.Select
              {...register('action', { required: 'Please select an action' })}
              isInvalid={!!errors.action}
              className={styles.selectField}
            >
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.action?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              {...register('category')}
              className={styles.selectField}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-around gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
              className={styles.buttonSecondary}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className={styles.buttonPrimary}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTransactionModal;
