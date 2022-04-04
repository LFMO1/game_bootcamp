package Fila;

public class Fila1 {
	private int[] elemento;
	private int fim = 0;
	
	public Fila1() {
		this(10);
	}
	
	public Fila1(int tamanho) {
		elemento = new int[tamanho];
	}

	public void adicionar(int valor) {
		if (fim < elemento.length) {
			elemento[fim] = valor;
			fim++;
		} else {
			throw new RuntimeException("Pilha cheia");
		}
	}

	public int capacidade() {
		return elemento.length;
	}
	
	public boolean cheia() {
		return fim == elemento.length;
	}
	
	public int comprimento() {
		return fim;
	}
	
	public int elemento(int pos) {
		if (pos < fim && pos > -1) {
			return elemento[pos];
		} else {
			throw new RuntimeException("Posição inválida");
		}
	}
	
	public int remover() {
		if (fim > 0) {
			int aux = elemento[0];
			for(int i=1;i<fim;i++) {
				elemento[i-1]=elemento[i];
			}
			fim--;
			return elemento[fim];
		} else {
			throw new RuntimeException("Pilha vazia");
		}
	}
	
	public String toString() {
		String texto = "[ ";
		for (int i = 0; i < fim; i++) {
			texto += elemento[i];
			texto += " ";
		}
		texto += "] : ";
		texto += fim;
		return texto;
	}
	
	public boolean vazia() {
		return fim == 0;
	}

}
