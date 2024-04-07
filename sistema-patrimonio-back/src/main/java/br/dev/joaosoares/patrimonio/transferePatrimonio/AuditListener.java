//package br.dev.joaosoares.patrimonio.transferePatrimonio;
//
//import java.time.LocalDateTime;
//import java.util.Date;
//
//import org.springframework.data.annotation.CreatedBy;
//import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.annotation.LastModifiedBy;
//import org.springframework.data.annotation.LastModifiedDate;
//
//import org.springframework.data.jpa.domain.support.AuditingEntityListener;
//
//import jakarta.persistence.EntityListeners;
//import jakarta.persistence.MappedSuperclass;
//import jakarta.persistence.Temporal;
//import jakarta.persistence.TemporalType;
//
//import lombok.Data;
//
//@Data
//@EntityListeners(AuditingEntityListener.class) // indica que esta classe está ouvindo eventos de auditoria
//@MappedSuperclass // marca a classe como uma classe mãe que será herdada por outras classes
//public abstract class AuditListener<A>{ // Parametro <A> vai representar quem criou ou modificou a entidade.
//
//	@CreatedBy // Marca o campo como aquele que registra quem criou a entidade.
//    protected A criadoPor;
//
//    @CreatedDate // Marca o campo como aquele que registra a data e hora da criação da entidade.
//    @Temporal(TemporalType.TIMESTAMP)
//    protected Date dataCriacao;
//
//    @LastModifiedBy // Marca o campo como aquele que registra quem modificou pela última vez a entidade.
//    protected A modificadoPor;
//
//    @LastModifiedDate // Marca o campo como aquele que registra a data e hora da última modificação da entidade.
//    @Temporal(TemporalType.TIMESTAMP)
//    protected LocalDateTime dataHoraModificacao;
//
//}
