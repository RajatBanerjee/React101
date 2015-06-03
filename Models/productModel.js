module.exports = {

	getFlatResponse : function(rawProduct) {

		var product = {
			title: rawProduct.ItemAttributes.Title || '',
				artist: rawProduct.ItemAttributes.Artist.FirstName + rawProduct.ItemAttributes.Artist.LastName || '',
				apNum: rawProduct.ItemNumber || '',
				podConfigId: rawProduct.podConfigId || 0,
				sku: rawProduct.Sku || '',
				ProductPageUrl: rawProduct.ItemAttributes.ProductPageUrl || '',
				productType: rawProduct.ItemAttributes.Type || '',
				CompositeSKU: rawProduct.CompositeSKU || "0",
				serviceInfo: {
					ServiceID: rawProduct.Service.ServiceID || 0,
					Frame: rawProduct.Service.Frame || '',
					CanvasMuseum: {
						imageUrl: (rawProduct.Service.CanvasMuseum !=null?rawProduct.Service.CanvasMuseum.Image.HttpImageURL : ''),
						dimensions :(rawProduct.Service.CanvasMuseum !=null?rawProduct.Service.CanvasMuseum.Image.Dimensions : ''),
					},
					CanvasGallery: {
						imageUrl:(rawProduct.Service.CanvasGallery !=null?rawProduct.Service.CanvasGallery.Image.HttpImageURL : ''),
						dimensions :(rawProduct.Service.CanvasGallery !=null?rawProduct.Service.CanvasGallery.Image.Dimensions : ''),
					},
					Mounting:{
						imageUrl:(rawProduct.Service.Mounting !=null?rawProduct.Service.Mounting.Image.HttpImageURL : ''),
						dimensions :(rawProduct.Service.Mounting !=null?rawProduct.Service.Mounting.Image.Dimensions :''),
					},
					Acrylic:{
						imageUrl:(rawProduct.Service.Acrylic !=null?rawProduct.Service.Acrylic.Image.HttpImageURL :''),
						dimensions :(rawProduct.Service.Acrylic !=null?rawProduct.Service.Acrylic.Image.Dimensions :''),
					},
					PrintOnly: {
						imageUrl:(rawProduct.Service.PrintOnly !=null?rawProduct.Service.PrintOnly.Image.HttpImageURL :''),
						dimensions :(rawProduct.Service.PrintOnly !=null?rawProduct.Service.PrintOnly.Image.Dimensions :''),
					},
					PosterCalendar: {
						imageUrl:(rawProduct.Service.PosterCalendar !=null?rawProduct.Service.PosterCalendar.Image.HttpImageURL : ''),
						dimensions :(rawProduct.Service.PosterCalendar !=null?rawProduct.Service.PosterCalendar.Image.Dimensions : ''),
					},
					Laminate: {
						imageUrl:(rawProduct.Service.PosterCalendar !=null?rawProduct.Service.Laminate.Image.HttpImageURL : ''),
						dimensions :(rawProduct.Service.PosterCalendar !=null?rawProduct.Service.Laminate.Image.Dimensions : ''),
					},
					LaminaFrame: {
						imageUrl:(rawProduct.Service.PosterCalendar !=null?rawProduct.Service.LaminaFrame.Image.HttpImageURL : ''),
						dimensions :(rawProduct.Service.PosterCalendar !=null?rawProduct.Service.LaminaFrame.Image.Dimensions : ''),
					},
				},
				images: {
					smallImageUrl: rawProduct.ImageInformation.SmallImage.HttpIMageURL,
					largeImageUrl: rawProduct.ImageInformation.LargeImage.HttpImageURL || '',
					largeImageWidth: rawProduct.ImageInformation.LargeImage.Dimensions.Width || '',
					largeImageHeight: rawProduct.ImageInformation.LargeImage.Dimensions.Height || '',
					mediumImageUrl: rawProduct.ImageInformation.MediumImage.HttpImageURL || '',
					mediumImageWidth: rawProduct.ImageInformation.MediumImage.Dimensions.Width || '',
					mediumImageHeight: rawProduct.ImageInformation.MediumImage.Dimensions.Height || '',
					thumbnailImageUrl: rawProduct.ImageInformation.ThumbnailImage.HttpImageURL || '',
					genericImageUrl: rawProduct.ImageInformation.GenericImageUrl || '',
					watermarkerUrl: rawProduct.ImageInformation.WatermarkerUrl || '',

				},
				dimensions: {
					inchWidth: rawProduct.ItemAttributes.PhysicalDimensions.Width || '',
					inchHeight: rawProduct.ItemAttributes.PhysicalDimensions.Height || ''
				},
				prices: {
					msrp: rawProduct.ItemPrice.MSRP || 0,
					price: rawProduct.ItemPrice.Price || 0,
					displayPrice: rawProduct.ItemPrice.DisplayPrice || '$0.00',
					markdownPrice: rawProduct.ItemPrice.MarkDownPrice || '$0.00'
				},
				transitTime : {
					daysMax: rawProduct.TransitTime.DaysMaximum || 0,
					daysMin: rawProduct.TransitTime.DaysMinimum || 0,
					text: rawProduct.TransitTime.TransitTimeText || ''
				},
				variations : rawProduct.Variations
		}
		return product;
	}
}