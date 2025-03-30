try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173/" -TimeoutSec 10
    Write-Output "Servidor acessível. Status: $($response.StatusCode)"
    Write-Output "Conteúdo recebido:"
    Write-Output $response.Content
} catch {
    Write-Output "Erro ao acessar o servidor: $_"
} 