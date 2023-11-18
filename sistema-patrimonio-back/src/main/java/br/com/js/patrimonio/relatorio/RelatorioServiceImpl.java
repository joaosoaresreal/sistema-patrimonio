package br.com.js.patrimonio.relatorio;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.stereotype.Service;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;

@Service
public class RelatorioServiceImpl implements RelatorioService {
	// RELATÓRIO DE TRANSFERENCIA
	public byte[] gerarRelatorioTransferencia(RelatorioTransferePatrimonioDTO dados) throws IOException{
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            // Fonte em negrito
            PdfFont fontNegrito = PdfFontFactory.createFont("Helvetica-Bold");
            // Logo
            Image logo = new Image(ImageDataFactory.create("docs/logo-js-softwares.png"));
            logo.setWidth(50);
            logo.setHeight(50);

            // Tamanho da tabela
            float tableWidth = 400f;

            // Criando a tabela de patrimonio
            Table patrimonio = new Table(4).setWidth(tableWidth)
                    .setHorizontalAlignment(HorizontalAlignment.CENTER);
            // Adicionar cabeçalho à tabela
            patrimonio.addCell(new Cell().add(new Paragraph("Plaqueta").setTextAlignment(TextAlignment.CENTER)));
            patrimonio.addCell(new Cell().add(new Paragraph("Descrição").setTextAlignment(TextAlignment.CENTER)));
            patrimonio.addCell(new Cell().add(new Paragraph("Estado de Conservação").setTextAlignment(TextAlignment.CENTER)));
            patrimonio.addCell(new Cell().add(new Paragraph("Observações").setTextAlignment(TextAlignment.CENTER)));
            // Adicionar linhas à tabela
            patrimonio.addCell(new Cell().add(new Paragraph(dados.getPlaqueta()).setTextAlignment(TextAlignment.CENTER)));
            patrimonio.addCell(new Cell().add(new Paragraph(dados.getDescricao()).setTextAlignment(TextAlignment.CENTER)));
            patrimonio.addCell(new Cell().add(new Paragraph(dados.getEstado()).setTextAlignment(TextAlignment.CENTER)));
            patrimonio.addCell(new Cell().add(new Paragraph(dados.getObservacao()).setTextAlignment(TextAlignment.CENTER)));

            // criando a tabela que fará o header do documento
            Table header = new Table(2);
            header.addCell(new Cell().add(logo).setBorder(Border.NO_BORDER));
            header.addCell(new Cell().add(new Paragraph("Desenvolvimento de Aplicativos "
            		+ "Móveis Multiplataforma, Desenvolvimento de Serviços "
            		+ "para Web II e Atividades de Extensão IV")
            		.setTextAlignment(TextAlignment.CENTER)).setBorder(Border.NO_BORDER));

            // Adicionar conteúdo ao documento usando dados do front
            document.add(header);
            document.add(new Paragraph("Termo de Transferência de Responsabilidade de Bens Patrimoniais\n")
            		.setFont(fontNegrito).setFontSize(18).setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph("Eu " + dados.getUser() + ", lotado no departamento " + 
            		dados.getDeptoUser() + ", até esta data responsável pelos bens constantes do presente "
            				+ "relatório, em anexo, declaro estar transferida a responsabilidade sobre os "
            				+ "mesmos para o departamento " + dados.getDeptoRecebedor() + ", que passará a ter inteira "
            				+ "responsabilidade pela guarda, uso e controle dos mesmos, respondendo por "
            				+ "possíveis diferenças que possam vir a surgir no tocante à quantidade sob "
            				+ "sua guarda.\n").setTextAlignment(TextAlignment.JUSTIFIED));
            document.add(patrimonio);
            document.add(new Paragraph("\nPara os devidos fins lavramos em conjunto o presente "
            		+ "Termo em 3 (três) vias que serão assinadas pelo responsável atual, pelo futuro "
            		+ "responsável e pelo Setor de Patrimônio.\n").setTextAlignment(TextAlignment.JUSTIFIED));
            document.add(new Paragraph("Naviraí/MS, " + dados.getData() + 
            		"\n\n").setTextAlignment(TextAlignment.RIGHT));
            document.add(new Paragraph("\n\n\n"
            		+ "_____________________________________________\n"
            		+ "DEPTO QUE TRANSFERE").setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph("\n\n\n"
            		+ "_____________________________________________\n"
            		+ "DEPTO QUE RECEBE").setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph("\n\n\n"
            		+ "_____________________________________________\n"
            		+ "DEPTO DE PATRIMONIO").setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph("\nEmitido por SS Tech - "
            		+ "www.github.com/joaosoaresreal/sistema-patrimonio")
            		.setTextAlignment(TextAlignment.CENTER).setFontSize(10));

            document.close();

            return outputStream.toByteArray();
        }
	}
	
	// RELATÓRIO DE BAIXA
	
	
	
	
}
