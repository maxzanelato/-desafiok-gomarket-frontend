import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { FiArrowLeft, FiUser, FiTag } from 'react-icons/fi';
import { MdAttachMoney } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import api from '../../services/api';
import fileApi from '../../services/file-api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from './../../utils/getValidationErros';

import logoImg from './../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  AnimationContainer,
  Content,
  Background,
  FileUpload,
} from './styles';

interface ProductRegistrationFormData {
  name: string;
  price: number;
  brand: string;
}

const Product: React.FC = () => {
  /**
   * File Upload
   */
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Selecione uma imagem');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChangeHandler = (e: any) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  /**
   * File Upload
   */

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
        let resp;
        if (params?.id) {
          resp = await api.put(`/products/${params.id}`, {
            ...product,
            ...data,
          });
          message = 'Atualização realizada!';
        } else {
          resp = await api.post('/products', data);
          message = 'Cadastro realizado!';
        }

        addToast({
          type: 'success',
          title: message,
          description: 'Você já pode cadastrar outro!',
        });

        try {
          var input: any = document.getElementById('customFile');

          const formData = new FormData();
          formData.append('image', input.files[0]);
          await fileApi.post(`/products/${resp.data.id}/image`, formData, {
            onUploadProgress: (progressEvent) => {
              setUploadPercentage(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );

              //tirar a porcentagem
              setTimeout(() => setUploadPercentage(0), 10000);
            },
          });
        } catch (e) {
          addToast({
            type: 'error',
            title: 'Erro no upload de imagem',
            description:
              'Não foi possível realizar o upload, mas o cadastro foi confirmado.',
          });
        }

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

            <FileUpload>
              <label htmlFor="customFile">
                {fileName ? fileName : 'Selecione uma imagem'}
              </label>
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={onChangeHandler}
              />
              <br />
              {uploadPercentage}% uploaded
            </FileUpload>
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
