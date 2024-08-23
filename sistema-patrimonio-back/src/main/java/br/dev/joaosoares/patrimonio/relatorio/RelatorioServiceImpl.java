package br.dev.joaosoares.patrimonio.relatorio;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.VerticalAlignment;

import br.dev.joaosoares.patrimonio.departamento.Departamento;
import br.dev.joaosoares.patrimonio.departamento.DepartamentoDTO;
import br.dev.joaosoares.patrimonio.departamento.DepartamentoService;
import br.dev.joaosoares.patrimonio.patrimonio.Patrimonio;
import br.dev.joaosoares.patrimonio.patrimonio.PatrimonioRepository;

import com.itextpdf.layout.element.Cell;

@Service
public class RelatorioServiceImpl implements RelatorioService {

	@Autowired
	private PatrimonioRepository patrimonioRepository;

	@Autowired
	private DepartamentoService departamentoService;

	// RELATÓRIO DE TRANSFERENCIA
	public byte[] gerarRelatorioTransferencia(RelatorioTransferePatrimonioDTO dados) throws IOException {
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
			PdfWriter writer = new PdfWriter(outputStream);
			PdfDocument pdf = new PdfDocument(writer);
			Document document = new Document(pdf);
			// Fonte em negrito
			PdfFont fontNegrito = PdfFontFactory.createFont("Helvetica-Bold");

			// Tamanho da tabela
			float tableWidth = 510f;

			// Criando a tabela de patrimonio
			Table patrimonio = new Table(4).setWidth(tableWidth).setHorizontalAlignment(HorizontalAlignment.CENTER);
			// Adicionar cabeçalho à tabela
			patrimonio.addCell(new Cell().add(new Paragraph("Plaqueta").setTextAlignment(TextAlignment.CENTER)));
			patrimonio.addCell(new Cell().add(new Paragraph("Descrição").setTextAlignment(TextAlignment.CENTER)));
			patrimonio.addCell(
					new Cell().add(new Paragraph("Estado de Conservação").setTextAlignment(TextAlignment.CENTER)));
			patrimonio.addCell(new Cell().add(new Paragraph("Observações").setTextAlignment(TextAlignment.CENTER)));
			// Adicionar linhas à tabela
			patrimonio
					.addCell(new Cell().add(new Paragraph(dados.getPlaqueta()).setTextAlignment(TextAlignment.CENTER)));
			patrimonio.addCell(
					new Cell().add(new Paragraph(dados.getDescricao()).setTextAlignment(TextAlignment.CENTER)));
			patrimonio.addCell(new Cell().add(new Paragraph(dados.getEstado()).setTextAlignment(TextAlignment.CENTER)));
			patrimonio.addCell(
					new Cell().add(new Paragraph(dados.getObservacao()).setTextAlignment(TextAlignment.CENTER)));

			// Adicionar conteúdo ao documento usando dados do front
			document.add(RelatorioLayout.criarCabecalhoDocumento()); // Header
			document.add(RelatorioLayout.criarParagrafoTitulo("Termo de Transferência de Responsabilidade de Bens Patrimoniais")); // Nome Relatório
			document.add(new Paragraph("Eu " + dados.getUser() + ", lotado no departamento " + dados.getDeptoUser()
					+ ", até esta data responsável pelos bens constantes do presente "
					+ "relatório, em anexo, declaro estar transferida a responsabilidade sobre os "
					+ "mesmos para o departamento " + dados.getDeptoRecebedor() + ", que passará a ter inteira "
					+ "responsabilidade pela guarda, uso e controle dos mesmos, respondendo por "
					+ "possíveis diferenças que possam vir a surgir no tocante à quantidade sob " + "sua guarda.\n")
					.setTextAlignment(TextAlignment.JUSTIFIED));
			document.add(patrimonio);
			document.add(new Paragraph("\nPara os devidos fins lavramos em conjunto o presente "
					+ "Termo em 3 (três) vias que serão assinadas pelo responsável atual, pelo futuro "
					+ "responsável e pelo Setor de Patrimônio.\n").setTextAlignment(TextAlignment.JUSTIFIED));
			document.add(
					new Paragraph("Naviraí/MS, " + dados.getData() + "\n\n").setTextAlignment(TextAlignment.RIGHT));
			document.add(
					new Paragraph("\n\n\n" + "__________________________________________\n" + "Departamento de Transferencia")
							.setTextAlignment(TextAlignment.CENTER));
			document.add(
					new Paragraph("\n\n\n" + "__________________________________________\n" + "Departamento Recebedor")
							.setTextAlignment(TextAlignment.CENTER));
			document.add(
					new Paragraph("\n\n\n" + "__________________________________________\n" + "Setor Patrimonial")
							.setTextAlignment(TextAlignment.CENTER));
			document.add(RelatorioLayout.criarParagrafoEmissor()); // Rodapé

			document.close();

			return outputStream.toByteArray();
		}
	}


	// RELATÓRIO DE BAIXA
	public byte[] gerarRelatorioBaixa(RelatorioBaixaPatrimonioDTO dados) throws IOException{
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
			PdfWriter writer = new PdfWriter(outputStream);
			PdfDocument pdf = new PdfDocument(writer);
			Document document = new Document(pdf);

			// Fonte em negrito
			PdfFont fontNegrito = PdfFontFactory.createFont("Helvetica-Bold");

			// Tamanho da tabela
			float tableWidth = 510f;

			// Criando a tabela de patrimonio
			Table patrimonioBaixa = new Table(3).setWidth(tableWidth)
					.setHorizontalAlignment(HorizontalAlignment.CENTER);

			// Adicionar cabeçalho à tabela
			patrimonioBaixa.addCell(new Cell().add(new Paragraph("Plaqueta")
					.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
			patrimonioBaixa.addCell(new Cell().add(new Paragraph("Descrição")
					.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
			patrimonioBaixa.addCell(new Cell().add(new Paragraph("Observações")
					.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));

			patrimonioBaixa.addCell(new Cell().add(new Paragraph(dados.getPlaqueta())
				.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
			patrimonioBaixa.addCell(new Cell().add(new Paragraph(dados.getDescricao())
					.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
			patrimonioBaixa.addCell(new Cell().add(new Paragraph(dados.getObservacao())
					.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));

			var texto = new Paragraph("Pelo presente termo, eu " + dados.getNomeProfissional() + 
					", portador do CPF " + dados.getCpfProfissional() + ", "
					+ "no uso das atribuições legais, declaro que o bem patrimonial aqui listado não "
					+ "está em condições de uso, portanto o mesmo está sendo baixado pelo motivo "
					+ "descrito a baixo:\n").setTextAlignment(TextAlignment.JUSTIFIED);

			var motivo = new Paragraph(dados.getMotivo() + "\n").setFont(fontNegrito).setTextAlignment(TextAlignment.CENTER);

			var texto2 = new Paragraph("Para os devidos fins lavramos em conjunto o presente termo em "
					+ "3 (três) vias que serão assinadas pelo responsável atual do patrimônio, "
					+ "pelo profissional que autoriza a baixa e pelo responsável do Setor de Patrimônio.")
					.setTextAlignment(TextAlignment.JUSTIFIED);

			var assinaturas = new Paragraph("\n\n\n_____________________________________________\n" + 
			"DEPARTAMENTO RESPONSÁVEL" + "\n\n\n_____________________________________________\n" + 
			dados.getNomeProfissional() + "\n\n\n_____________________________________________\n" + 
			"DEPARTAMENTO DE PATRIMÔNIO").setTextAlignment(TextAlignment.CENTER);

			// ADICIONANDO ELEMENTOS AO PDF
			document.add(RelatorioLayout.criarCabecalhoDocumento()); // Header
			document.add(RelatorioLayout.criarParagrafoTitulo("Termo de Baixa Patrimonial")); // Nome Relatório
			document.add(texto);
			document.add(motivo);
			document.add(patrimonioBaixa); // Tabela de Patrimonio
			document.add(texto2);
			document.add(new Paragraph("Naviraí/MS, " + dados.getData() + "\n\n").setTextAlignment(TextAlignment.RIGHT));
			document.add(assinaturas);
			document.add(RelatorioLayout.criarParagrafoEmissor()); // Rodapé

			document.close();
			return outputStream.toByteArray();
		}
	}


	// RELATÓRIO DE PATRIMONIOS ATIVOS
	public byte[] gerarRelatorioPatrimonioGeral() throws IOException {
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

			List<Patrimonio> patrimonios = patrimonioRepository.findByAtivos();

			DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

			PdfWriter writer = new PdfWriter(outputStream);
			PdfDocument pdf = new PdfDocument(writer);
			Document document = new Document(pdf);

			// Tamanho da tabela
			float tableWidth = 510f;

			// Criando a tabela de patrimonio
			Table patrimonioGeral = new Table(5).setWidth(tableWidth)
					.setHorizontalAlignment(HorizontalAlignment.CENTER);

			// Adicionar cabeçalho à tabela
			patrimonioGeral.addCell(new Cell().add(new Paragraph("Plaqueta")
					.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
			patrimonioGeral.addCell(new Cell().add(new Paragraph("Descrição")
					.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
			patrimonioGeral.addCell(
					new Cell().add(new Paragraph("Data de Entrada").setTextAlignment(TextAlignment.CENTER)));
			patrimonioGeral
					.addCell(new Cell().add(new Paragraph("Observações")
							.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
			patrimonioGeral.addCell(
					new Cell().add(new Paragraph("Depto").setTextAlignment(TextAlignment.CENTER)));

			// Percorrendo os patrimonios para adicionar a tabela
			for (Patrimonio patrimonio : patrimonios) {
			    String dataFormatada = patrimonio.getDataEntrada().format(dateFormatter);

				patrimonioGeral.addCell(new Cell().add(new Paragraph(patrimonio.getPlaqueta())
						.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
				patrimonioGeral.addCell(new Cell().add(new Paragraph(patrimonio.getDescricao())));
				patrimonioGeral.addCell(new Cell().add(new Paragraph(dataFormatada)
						.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
				patrimonioGeral.addCell(new Cell().add(new Paragraph(patrimonio.getObservacao())));
				patrimonioGeral.addCell(new Cell().add(new Paragraph(patrimonio.getDepartamento().nome)));
			}


			// ADICIONANDO ELEMENTOS AO PDF
			document.add(RelatorioLayout.criarCabecalhoDocumento()); // Header
			document.add(RelatorioLayout.criarParagrafoTitulo("Relatório de Patrimonios - Geral")); // Nome Relatório
			document.add(patrimonioGeral); // Tabela de Patrimonio
			document.add(RelatorioLayout.criarParagrafoData()); // Data atual
			document.add(RelatorioLayout.criarParagrafoEmissor()); // Rodapé

			document.close();
			return outputStream.toByteArray();
		}
	}


	// RELATÓRIO DE PATRIMONIOS ATIVOS POR DEPTO
	public byte[] gerarRelatorioPatrimonioDepto(Departamento departamento) throws IOException {
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

			List<Patrimonio> patrimonios = patrimonioRepository.findAtivosByDepartamento(departamento);
			DepartamentoDTO dpto = departamentoService.findById(departamento.id);

			DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

			PdfWriter writer = new PdfWriter(outputStream);
			PdfDocument pdf = new PdfDocument(writer);
			Document document = new Document(pdf);

			// Tamanho da tabela
			float tableWidth = 510f;

			// Criando a tabela de patrimonio
			Table patrimonioDepto = new Table(4).setWidth(tableWidth)
					.setHorizontalAlignment(HorizontalAlignment.CENTER);

			// Adicionar cabeçalho à tabela
			patrimonioDepto.addCell(new Cell().add(new Paragraph("Plaqueta")
					.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
			patrimonioDepto.addCell(new Cell().add(new Paragraph("Descrição")
					.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
			patrimonioDepto.addCell(
					new Cell().add(new Paragraph("Data de Entrada").setTextAlignment(TextAlignment.CENTER)));
			patrimonioDepto
					.addCell(new Cell().add(new Paragraph("Observações")
							.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));

			// Percorrendo os patrimonios para adicionar a tabela
			for (Patrimonio patrimonio : patrimonios) {
			    String dataFormatada = patrimonio.getDataEntrada().format(dateFormatter);

			    patrimonioDepto.addCell(new Cell().add(new Paragraph(patrimonio.getPlaqueta())
						.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
			    patrimonioDepto.addCell(new Cell().add(new Paragraph(patrimonio.getDescricao())));
			    patrimonioDepto.addCell(new Cell().add(new Paragraph(dataFormatada)
						.setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE)));
			    patrimonioDepto.addCell(new Cell().add(new Paragraph(patrimonio.getObservacao())));
			}

			// ADICIONANDO ELEMENTOS AO PDF
			document.add(RelatorioLayout.criarCabecalhoDocumento()); // Header
			document.add(RelatorioLayout.criarParagrafoTitulo("Relatório de Patrimonios - " + dpto.nome)); // Nome Relatório
			document.add(patrimonioDepto); // Tabela de Patrimonio
			document.add(RelatorioLayout.criarParagrafoData()); // Data atual
			document.add(RelatorioLayout.criarParagrafoEmissor()); // Rodapé

			document.close();
			return outputStream.toByteArray();
		}
	}

}
