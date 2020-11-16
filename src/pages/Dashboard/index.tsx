import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight, FiCameraOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from './../../services/api';

import logoImg from '../../assets/logo.svg';

import { Container, Title, Form, Products, Error } from './styles';

interface Product {
  brand: string;
  createdAt: string;
  id: string;
  image: string;
  name: string;
  price: string;
  providerId: string;
  updateAt: string;
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [products, setProducts] = useState<Array<Product>>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories'
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    api.get('/products').then((resp) => {
      setProducts(resp.data);
    });
  }, []);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite um nome de produto válido!');
      return;
    }

    try {
      const response = await api.get<Product>(`/repos/${newRepo}`);

      const repository = response.data;

      setProducts([...products, repository]);

      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse produto!');
    }
  }

  return (
    <Container>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore os produtos cadastrados</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Pesquise pelo nome do produto"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Products>
        {products.map((repository) => (
          <Link key={repository.id} to={`/repository/${repository.id}`}>
            {repository.image ? (
              <img
                src={`${api.defaults.baseURL}/files/${repository.image}`}
                alt={repository.image}
              />
            ) : (
              <span>
                <FiCameraOff size={20} />
              </span>
            )}
            <div>
              <strong>{repository.name}</strong>
              <p>{repository.price}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Products>
    </Container>
  );
};

export default Dashboard;
