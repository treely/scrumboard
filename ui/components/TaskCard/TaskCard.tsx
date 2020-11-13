import styles from './styles.module.scss';
import Task from '../../models/Task';
import ActionIcons from '../ActionIcons';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Input, Form, Button } from 'antd';

type PropTypes = {
  task: Task;
  onChange: (task: Task) => void;
  onDelete: (task: Task) => void;
};
const TaskCard = ({ task, onChange, onDelete }: PropTypes): JSX.Element => {
  const [form] = Form.useForm();

  const [edit, setEdit] = useState(false);

  const getUpdatedTask = (): Task => ({
    description: form.getFieldValue('description'),
    user: {
      color: task.user.color,
      name: form.getFieldValue('user'),
    },
  });

  const onSubmit = (): void => {
    onChange(getUpdatedTask());
    setEdit(false);
  };

  return (
    <div className={styles.taskContainer}>
      <Form
        form={form}
        initialValues={{ description: task.description, user: task.user.name }}
        onFinish={onSubmit}
      >
        <div className={styles.taskHeader}>
          {edit ? (
            <ActionIcons
              icon1={
                <Button
                  className={styles.unstyledButton}
                  type="link"
                  htmlType="submit"
                >
                  <SaveOutlined />
                </Button>
              }
              icon2={<CloseOutlined onClick={(): void => setEdit(false)} />}
            />
          ) : (
            <ActionIcons
              icon1={<EditOutlined onClick={(): void => setEdit(true)} />}
              icon2={
                <DeleteOutlined
                  onClick={(): void => onDelete(getUpdatedTask())}
                />
              }
            />
          )}
        </div>
        <div className={styles.taskBody}>
          {edit ? (
            <Form.Item name="description" className={styles.formItem}>
              <Input.TextArea rows={3} placeholder="My task" />
            </Form.Item>
          ) : (
            form.getFieldValue('description')
          )}
        </div>
        <div className={styles.taskFooter}>
          {edit ? (
            <Form.Item name="user" className={styles.formItem}>
              <Input placeholder="User" />
            </Form.Item>
          ) : (
            <div
              className={styles.nameBadge}
              style={{ backgroundColor: task.user.color }}
            >
              {form.getFieldValue('user')}
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default TaskCard;
