// src/routers.js
const express = require('express');
const router = express.Router();
const VeiculosController = require('./controllers/VeiculosController');
const TipoVeiculoController = require('./controllers/TipoVeiculoController');
const VinculoProdVeiculoController = require('./controllers/VinculoProdVeiculoController');
const MarcasController = require('./controllers/MarcasController');
const FornecedoresController = require('./controllers/FornecedoresController');
const LoginController = require('./controllers/LoginController');
const {NotaFiscalController ,handleMulterErrors,upload}= require('./controllers/NotaFiscalController');
const ProdutosController = require('./controllers/ProdutosController');
const authenticateToken = require('./middlewares/authenticateToken'); // Importa o middleware de autenticação
const ProdutosNFController = require('./controllers/ProdutosNFController'); // Ajuste o caminho conforme necessário
const UFMunicipiosController = require('./controllers/UFMunicipiosController'); // Ajuste o caminho conforme necessário
const GrupoProdutoController = require('./controllers/GrupoProdutoController'); // Ajuste o caminho conforme necessário
const SubgrupoprodutoController = require('./controllers/SubgrupoprodutoController'); // Ajuste o caminho conforme necessário
const VendasController = require('./controllers/VendasController'); // Ajuste o caminho conforme necessário
const ClientesController = require('./controllers/ClientesController'); // Ajuste o caminho conforme necessário



// Aplica o middleware de autenticação globalmente a todas as rotas, exceto as rotas de login e registro

router.post('/auth/register', LoginController.register);
router.post('/auth/login', LoginController.login); // Exclui as rotas de autenticação do middleware


// Aplica o middleware de autenticação para proteger todas as rotas abaixo
router.use(authenticateToken);

// Rotas para manipulação de Veiculos
router.post('/veiculos', VeiculosController.criarVeiculos);
router.get('/veiculos', VeiculosController.obterTodosVeiculos);
router.get('/veiculos/:id', VeiculosController.obterVeiculosPorId);
router.put('/veiculos/:id', VeiculosController.atualizarVeiculos);
router.delete('/veiculos/:id', VeiculosController.deletarVeiculos);

// Rotas para manipulação de Tipo Veiculos
router.post('/tipoveiculo', TipoVeiculoController.criarTipoVeiculo);
router.get('/tipoveiculo', TipoVeiculoController.obterTodosTipoVeiculo);
router.get('/tipoveiculo/:id', TipoVeiculoController.obterTipoVeiculoPorId);
router.put('/tipoveiculo/:id', TipoVeiculoController.atualizarTipoVeiculo);

// Rotas para manipulação de Veiculos
router.post('/vinculoprodveiculo', VinculoProdVeiculoController.criarVinculo);
router.get('/vinculoprodveiculo', VinculoProdVeiculoController.obterTodasVinculos);
router.get('/vinculoprodveiculo-lista', VinculoProdVeiculoController.getVinculoProdVeiculoAll);
router.get('/vinculoprodveiculo/:id', VinculoProdVeiculoController.obterVinculoPorId);
router.put('/vinculoprodveiculo/:id', VinculoProdVeiculoController.atualizarVinculo);
router.get('/vinculoprodveiculo/produto/:produtoId/nota/:notaFiscalId', VinculoProdVeiculoController.obterVinculoPorProdutoId);

// Rotas para marcas
router.post('/marcas', MarcasController.criarMarca);
router.get('/marcas', MarcasController.obterTodasMarcas);
router.get('/marcas/:id', MarcasController.obterMarcaPorId);
router.put('/marcas/:id', MarcasController.atualizarMarca);
router.delete('/marcas/:id', MarcasController.deletarMarca);

// Rotas para fornecedores
router.post('/fornecedores', FornecedoresController.criarFornecedores);
router.get('/fornecedores', FornecedoresController.obterTodasFornecedores);
router.get('/fornecedores/:id', FornecedoresController.obterFornecedoresPorId);
router.put('/fornecedores/:id', FornecedoresController.atualizarFornecedores);
router.delete('/fornecedores/:id', FornecedoresController.deletarFornecedores);

// Rotas para clientes
router.post('/clientes', ClientesController.criarClientes);
router.get('/clientes', ClientesController.obterTodosClientes);
router.get('/clientes/:id', ClientesController.obterClientePorId);
router.put('/clientes/:id', ClientesController.atualizarCliente);
router.delete('/clientes/:id', ClientesController.deletarCliente);

// Rotas para Grupo produtos
router.post('/grupoprodutos', GrupoProdutoController.criarGrupoProduto);
router.get('/grupoprodutos', GrupoProdutoController.listarGruposProduto);
router.get('/grupoprodutos/:id', GrupoProdutoController.obterGrupoProdutoPorId);
router.put('/grupoprodutos/:id', GrupoProdutoController.atualizarGrupoProduto);
router.delete('/grupoprodutos/:id', GrupoProdutoController.excluirGrupoProduto);

// Rotas para Sub Grupo produtos
router.post('/subgrupoprodutos', SubgrupoprodutoController.criarSubgrupoproduto);
router.get('/subgrupoprodutos', SubgrupoprodutoController.listarSubgruposProduto);
router.get('/subgrupoprodutos/:id', SubgrupoprodutoController.obterSubgrupoprodutoPorId);
router.put('/subgrupoprodutos/:id', SubgrupoprodutoController.atualizarSubgrupoproduto);
router.delete('/subgrupoprodutos/:id', SubgrupoprodutoController.excluirSubgrupoproduto);

// Rotas para produtos
router.post('/produtos', ProdutosController.criarProduto);
router.get('/produtos', ProdutosController.listarProdutos);
router.get('/export/produtos', ProdutosController.exportProdutos);
router.get('/produtos/:id', ProdutosController.obterProdutoPorId);
router.put('/produtos/:id', ProdutosController.atualizarProduto);
router.delete('/produtos/:id', ProdutosController.excluirProduto);

// Rotas para nota fiscal eletronica
router.post('/notafiscalimport',upload.array('xml'),handleMulterErrors,NotaFiscalController.importarNotaFiscal);
router.post('/notafiscal',NotaFiscalController.criarNotaFiscal);
router.get('/notafiscal', NotaFiscalController.listarNotaFiscal);
router.get('/notafiscal/:id', NotaFiscalController.obterNotaFiscalPorId);
router.put('/notafiscal/:id', NotaFiscalController.atualizarNotaFiscal);
router.delete('/notafiscal/:id', NotaFiscalController.excluirNotaFiscal);

// Rotas para produtos nota fiscal
router.get('/produtosnf/:notaFiscalId', ProdutosNFController.getProdutosPorNotaFiscal);
router.get('/produtosnf/quantidadeRestante/:notaFiscalId', ProdutosNFController.obterQuantidadeRestanteParaVinculo);
router.put('/produtosnf/vincular/:id', ProdutosNFController.vincularProdutoNF);
router.put('/produtosnf/desvincular/:id', ProdutosNFController.desvincularProdutoNF);

//Rotas UFs e Municipios
router.get('/uf', UFMunicipiosController.obterTodasUF);
router.get('/municipios/:codUfId', UFMunicipiosController.obterMunicipiosPorUF);
router.get('/uf/uf/:codIBGE', UFMunicipiosController.obterUFPorId);
router.get('/municipios/mun/:id', UFMunicipiosController.obterMunicipioPorId);

//Rotas de Vendas
router.post('/vendas', VendasController.registraVenda);
router.get('/vendas', VendasController.consultaVendas);
router.get('/vendas/:id', VendasController.consultaItensPorVenda);


module.exports = router;
