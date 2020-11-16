import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import {
  FiCameraOff,
  FiMoreVertical,
  FiTrash2,
  FiEdit2,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiCamera,
  FiPlus,
} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useToast } from './../../hooks/toast';

import api from './../../services/api';

import Button from './../../components/Button';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Title,
  Form,
  Products,
  Error,
  DivMenu,
  Pagination,
  ConfirmationDialog,
  ContainerButtonAdd,
} from './styles';

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
  const [search, setSearch] = useState('');
  const [inputError, setInputError] = useState('');
  const [products, setProducts] = useState<Array<Product>>([]);
  const [page, setPage] = useState<number>(0);
  const history = useHistory();

  const { addToast } = useToast();

  useEffect(() => {
    api.get('/products').then((resp) => {
      setProducts(resp.data);
    });
  }, []);

  const fetchPage = useCallback((page: number, keyword?: string) => {
    const count = 8;
    api
      .get(
        `/products?skip=${page * count}&take=${count}${
          keyword ? '&keyword=' + keyword : ''
        }`
      )
      .then((resp) => {
        setProducts(resp.data);
        setPage(page);
      });
  }, []);

  const handleConfirmationDelete = useCallback((id: string) => {
    api
      .delete(`/products/${id}`)
      .then((resp) => {
        addToast({
          type: 'success',
          title: 'Remoção realizada',
          description: 'O produto foi removido.',
        });
        fetchPage(page);
      })
      .catch((error) => {
        addToast({
          type: 'error',
          title: 'Erro na remoção',
          description: 'Ocorreu um erro ao remover, tente novamente.',
        });
      });
  }, []);

  const handleDelete = useCallback((product: Product) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmationDialog>
            <h1>Você está certo?</h1>
            <p>
              Você realmente gostaria de remover o produto {product.name} da
              marca {product.brand}?
            </p>
            <button onClick={onClose}>Não</button>
            <button
              onClick={() => {
                handleConfirmationDelete(product.id);
                onClose();
              }}
            >
              Sim, remova-o!
            </button>
          </ConfirmationDialog>
        );
      },
    });
  }, []);

  async function handleSearchProduct(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    try {
      fetchPage(0, search);

      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse produto!');
    }
  }

  return (
    <>
      <Container>
        <img src={logoImg} alt="GoMarket" />
        <Title>Explore os produtos cadastrados</Title>

        <Form hasError={!!inputError} onSubmit={handleSearchProduct}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquise pelo nome do produto"
          />
          <button type="submit">Pesquisar</button>
        </Form>

        {inputError && <Error>{inputError}</Error>}

        <Products>
          {!products || products.length === 0 ? (
            <>
              <h1>Que pena! :((</h1>
              <br />
              <p>
                Nenhum produto encontrado. Mas você poderá cadastrar um novo no
                botão inferior direito.
              </p>
            </>
          ) : (
            products.map((product) => (
              <Link key={product.id} to={'#'}>
                {product.image ? (
                  <img
                    src={`${api.defaults.baseURL}/files/${product.image}`}
                    alt={product.image}
                  />
                ) : (
                  <span>
                    <FiCameraOff size={20} />
                  </span>
                )}
                <div>
                  <strong>{product.brand}</strong>
                  <p>{product.name}</p>
                  <p className="price">R$ {product.price}</p>
                </div>
                <DivMenu>
                  <ul>
                    <li>
                      <a href="#">
                        <FiMoreVertical size={30} />
                      </a>
                      <ul>
                        <li>
                          <Link
                            className="edit-button"
                            key="editButton"
                            to={'#'}
                          >
                            <FiEdit2 size={20} />
                            Editar
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="add-image-button"
                            key="addImageButton"
                            to={'#'}
                          >
                            <FiCamera size={20} />
                            Add foto
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="delete-button"
                            key="editButton"
                            to={'#'}
                            onClick={() => handleDelete(product)}
                          >
                            <FiTrash2 size={20} />
                            Excluir
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </DivMenu>
              </Link>
            ))
          )}
        </Products>
        <Pagination>
          <button>
            <FiArrowLeftCircle onClick={() => fetchPage(page - 1)} />
          </button>
          <button>
            <FiArrowRightCircle onClick={() => fetchPage(page + 1)} />
          </button>
        </Pagination>
      </Container>
      <ContainerButtonAdd>
        <Button
          type="button"
          onClick={() => {
            history.push('/product');
          }}
        >
          <FiPlus />
          Cadastrar
        </Button>
      </ContainerButtonAdd>
    </>
  );
};

export default Dashboard;
