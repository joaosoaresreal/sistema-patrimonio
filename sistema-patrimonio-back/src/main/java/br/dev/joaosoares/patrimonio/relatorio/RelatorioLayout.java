package br.dev.joaosoares.patrimonio.relatorio;

import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;

import java.io.IOException;
import java.net.MalformedURLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class RelatorioLayout {

    private static DateFormat dateFormat = new SimpleDateFormat("dd 'de' MMMM 'de' yyyy");
    private static Date date = new Date();

	// HEADER
    public static Table criarCabecalhoDocumento() {

    	// LOGO
        Image logo = null;
		try {
			logo = new Image(ImageDataFactory.create("docs/logo-ss-tech.png")).setWidth(50).setHeight(50);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
        Cell cellLogo = new Cell().add(logo).setBorder(Border.NO_BORDER);

        // TITULO DO HEADER
        Cell cellTexto = new Cell().add(new Paragraph("SCP - Sistema de Controle Patrimonial\n" + 
        "____________________________________________________________________\n" + 
        "Tecnologia em Análise e Desenvolvimento de Sistemas")
        		.setTextAlignment(TextAlignment.CENTER)).setBorder(Border.NO_BORDER);

        // Criar tabela com duas células para o cabeçalho do documento
        Table header = new Table(2);
        header.addCell(cellLogo);
        header.addCell(cellTexto);

        return header;
    }

    // TITULO DO RELATÓRIO
    public static Paragraph criarParagrafoTitulo(String titulo) throws IOException {
    	PdfFont fontNegrito = PdfFontFactory.createFont("Helvetica-Bold");

        return new Paragraph(titulo + "\n").setFont(fontNegrito).setFontSize(18).setTextAlignment(TextAlignment.CENTER);
    }


    // DATA ATUAL
    public static Paragraph criarParagrafoData() {
        return new Paragraph("Naviraí/MS, " + dateFormat.format(date) + " " + "\n\n").setTextAlignment(TextAlignment.RIGHT);
    }


    // FOOTER
    public static Paragraph criarParagrafoEmissor() {
        return new Paragraph("\nEmitido por SS Tech - www.joaosoares.dev.br")
                .setTextAlignment(TextAlignment.CENTER).setFontSize(10);
    }
}
