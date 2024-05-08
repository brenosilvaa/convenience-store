using ConvenienceStore.Features.Pixes.ValueObjects;
using System.ComponentModel.DataAnnotations;

namespace ConvenienceStore.Features.Users.ViewModels
{
    public class LoggedUserVM
    {
        [Required] public Guid Id { get; set; }
        [Required] public required string Name { get; set; }
        [Required, EmailAddress] public required string Email { get; set; }
        public string? Image { get; set; }

        /// <summary>
        /// Se o usuário for um vendedor [IsSeller], então a chave e seu respectivo tipos são retornados. Se o usuário for um cliente [IsSeller], esta propriedade retornará "null" 
        /// </summary>
        public Pix? Pix { get; set; }

        /// <summary>
        /// Indica se o usuário é um vendedor (true) ou um cliente (false)
        /// </summary>
        [Required]
        public bool IsSeller { get; set; }
        [Required]
        public required string Token { get; set; }
        [Required]
        public DateTime TokenValidity { get; set; }
    }
}
