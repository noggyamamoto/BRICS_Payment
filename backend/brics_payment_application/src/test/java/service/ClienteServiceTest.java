package service;

import dto.ClienteDTO;
import model.Cliente;
import repository.ClienteRepository;
import repository.ContaRepository;
import exception.BusinessException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private ContaRepository contaRepository;

    @InjectMocks
    private ClienteService clienteService;

    @Test
    void deveLancarErroQuandoCpfJaCadastrado() {
        ClienteDTO dto = new ClienteDTO();
        dto.setCpf("123.456.789-00");
        when(clienteRepository.existsByCpf(anyString())).thenReturn(true);

        assertThrows(BusinessException.class, () -> clienteService.cadastrar(dto));
    }
}