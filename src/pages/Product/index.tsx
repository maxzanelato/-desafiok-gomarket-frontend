import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FiArrowLeft, FiUser, FiTag } from 'react-icons/fi';
import { MdAttachMoney } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

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
  const params = useParams<{ id: string } | null>();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (params?.id) {
      api.get(`/products/${params.id}`).then((resp) => {
        setProduct(resp.data);
      });
    }
  }, [params]);

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

        let message = '';
        if (params?.id) {
          await api.put(`/products/${params.id}`, { ...product, ...data });
          message = 'Atualização realizada!';
        } else {
          await api.post('/products', data);
          message = 'Cadastro realizado!';
        }

        addToast({
          type: 'success',
          title: message,
          description: 'Você já pode cadastrar outro!',
        });

        formRef.current?.reset();
        setProduct({});
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

          <Form ref={formRef} initialData={product} onSubmit={handleSubmit}>
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
