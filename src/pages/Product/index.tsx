import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiTag } from 'react-icons/fi';
import { MdAttachMoney } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from './../../utils/getValidationErros';

import logoImg from './../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, AnimationContainer, Content, Background } from './styles';

interface ProductRegistrationFormData {
  name: string;
  price: number;
  brand: string;
}

const Product: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProductRegistrationFormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório!'),
          brand: Yup.string().required('Marca é obrigatória!'),
          price: Yup.number()
            .required('Preço é obrigatório!')
            .typeError('Não é um valor válido de preço!'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/products', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode cadastrar outro!',
        });

        // const fd = new FormData();
        // fd.append('image', data.image, image.name);
        // fd.append('_method', 'PATCH');
        // await api.patch('/products', )

        formRef.current?.reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoMarket" />

          <Form ref={formRef} initialData={{}} onSubmit={handleSubmit}>
            <h1>Cadastro de produtos</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="brand" icon={FiTag} placeholder="Marca" />
            <Input
              type="string"
              name="price"
              icon={MdAttachMoney}
              placeholder="Preço (ex.: 250.55)"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Product;
